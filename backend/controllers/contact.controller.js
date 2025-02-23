import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ContactUs } from "../models/contactUs.model.js";
import { sendEmail, contactSupportMailgenContent } from "../utils/mail.js";

const handleContactForm = AsyncHandler(async (req, res) => {
  const { fullName, email, phone, services, message } = req.body;
  if (
    fullName === "" ||
    email === "" ||
    phone === "" ||
    services.length === 0 ||
    message === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const contact = await ContactUs.create({
    fullName,
    email,
    phone,
    services,
    message,
  });

  await sendEmail({
    email: "umarfarooq567800@gmail.com",
    subject: "Contact Support",
    mailgenContent: contactSupportMailgenContent(
      fullName,
      email,
      phone,
      services,
      message
    ),
  });

  if (!contact) {
    throw new ApiError(500, "Error saving contact form data");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, { contact }, "Message sent successfully"));
});

export { handleContactForm };
