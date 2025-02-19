import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  sendEmail,
  forgotPasswordMailgenContent,
  emailVerificationMailgenContent,
} from "../utils/mail.js";
import { UserLoginType } from "../constants.js";

const getAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const register = AsyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if ([fullName, password, email].some((v) => v?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (await User.findOne({ email })) {
    throw new ApiError(400, "User Already Exist");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const token = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = token;
  user.emailVerificationExpiry = Date.now() + 3600000; // 1 hour

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get(
        "host"
      )}/api/v1/user/auth/verify-email/${token}`
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Signup Error || Registration error from backend or database"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, { user: createdUser }, "User created Successfully")
    );
  // client will redirect user to the login page,
  //  or emil verification so no need to send User object
  // .json(new ApiResponse(200, createdUser, "User created Successfully"));
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((v) => v?.trim() === "")) {
    throw new ApiError(400, "All field Required");
  }

  const existedUser = await User.findOne({ email });

  if (!existedUser) throw new ApiError(400, "User not found");

  if (existedUser.loginType !== UserLoginType.EMAIL_PASSWORD) {
    // If user is registered with some other method, we will ask him/her to use the same method as registered.
    // This shows that if user is registered with methods other than email password, he/she will not be able to login with password. Which makes password field redundant for the SSO
    throw new ApiError(
      400,
      "You have previously registered using " +
        existedUser.loginType?.toLowerCase() +
        ". Please use the " +
        existedUser.loginType?.toLowerCase() +
        " login option to access your account."
    );
  }

  if (!(await existedUser.isPasswordCorrect(password))) {
    throw new ApiError(401, "wrong credentials");
  }

  const { accessToken, refreshToken } = await getAccessAndRefreshTokens(
    existedUser._id
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    })
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken }, "Login success")
    );
});

const logout = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  res
    .status(200)
    .clearCookie("refreshToken", { httpOnly: true })
    .json(new ApiResponse(200, {}, "User logged out"));
});

const verify = AsyncHandler(async (req, res, next) => {
  // get user from req.user
  // find user in db
  // return user

  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(400, "user, not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "varify success"));
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  console.log("refreshAccessToken called");
  const incommingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incommingRefreshToken) {
    throw new ApiError(401, "Unauthorized request, please login again");
  }

  try {
    const decodedToken = jwt.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user || incommingRefreshToken !== user.refreshToken) {
      throw new ApiError(
        401,
        "Invalid or expired refresh token, please login again"
      );
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await getAccessAndRefreshTokens(user._id);

    const updatedUser = await User.findById(user._id).select(
      "-refreshToken -password"
    );

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      })
      .json(
        new ApiResponse(
          200,
          { user: updatedUser, accessToken },
          "Access token refreshed"
        )
      );
  } catch (error) {}
});

const handleSocialLogin = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(404, "user not found");

  // console.log(user)

  const { accessToken, refreshToken } = await getAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(301)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    }) // Set refresh token in cookie
    .redirect(
      `${process.env.CLIENT_SSO_REDIRECT_URL}?accessToken=${accessToken}`
    );
});

const verifyEmail = AsyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) {
    throw new ApiError(400, "Invalid Token");
  }
  console.log(token);

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or Expired Token");
  }
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  user.isEmailVerified = true;

  await user.save();

  return res
    .status(200)
    .redirect(`${process.env.CLIENT_EMAIL_VERIFIED_REDIRECT_URL}`)
    .json(new ApiResponse(200, {}, "Email Verified Successfully"));
});

// This controller is called when user is logged in and he has snackbar that your email is not verified
// In case he did not get the email or the email verification token is expired
// he will be able to resend the token while he is logged in
const resendEmailVerification = AsyncHandler(async (req, res) => {
  const { userId} = req.body
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }

  // if email is already verified throw an error
  if (user.isEmailVerified) {
    throw new ApiError(409, "Email is already verified!");
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = token;
  user.emailVerificationExpiry = Date.now() + 3600000; // 1 hour
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get(
        "host"
      )}/api/v1/user/auth/verify-email/${token}`
    ),
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Mail has been sent to your mail ID"));
});

const forgetPasswordReq = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  console.log("forgor req called");

  if (!user) throw new ApiError(404, "User Not Found");

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      // ! NOTE: Following link should be the link of the frontend page responsible to request password reset
      // ! Frontend will send the below token with the new password in the request body to the backend reset password endpoint
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/?token=${token}`
    ),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email Sent Successfully"));
});

const resetForgottenPassword = AsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Invalid or Expired Token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Reset Successfully"));
});

export {
  register,
  login,
  logout,
  verify,
  refreshAccessToken,
  handleSocialLogin,
  forgetPasswordReq,
  resetForgottenPassword,
  verifyEmail,
  resendEmailVerification,
};
