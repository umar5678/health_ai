import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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
  //  get user details from req.body
  // validate deails shoud not empty
  // check if user already exist
  // generate account number
  // create user in db, (note: before saving user, model will hash the password)
  // check if user is created or not
  // genfrate access token
  // send assecc token in cookie and user data in response

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

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(
      500,
      "Signup Error || Registration error from backend or database"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created Successfully"));
});

const login = AsyncHandler(async (req, res) => {
  // get user details fron body
  // check if user exist
  // check if password is correct
  // if password is correct then generate JWT Token
  // extract password from return res of db and send it to client along with token

  const { email, password } = req.body;
  if ([email, password].some((v) => v?.trim() === "")) {
    throw new ApiError(400, "All field Required");
  }

  const existedUser = await User.findOne({ email });

  if (!existedUser) throw new ApiError(400, "User not found");

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

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      })
      .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
  } catch (error) {}
});


const handleSocialLogin = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(404, "user not found");

  // console.log(user)

  const { accessToken, refreshToken } = await getAccessAndRefreshTokens(
    user._id
  );

  // // Encode user data safely for URL
  // const userData = encodeURIComponent(
  //   JSON.stringify({
  //     userId: user._id,
  //     name: user.fullName,
  //     email: user.email,
  //   })
  // );

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

export {
  register,
  login,
  logout,
  verify,
  refreshAccessToken,
  handleSocialLogin,
};
