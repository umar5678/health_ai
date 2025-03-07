import dotenv from "dotenv";
dotenv.config();
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Initialize mailgen instance with default theme and brand configuration
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Health AI",
      link: "http://localhost:8000",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // Generate an HTML email with the provided contents
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // Create a nodemailer transporter instance which is responsible to send a mail
  // const transporter = nodemailer.createTransport({
  //   host: process.env.MAILTRAP_SMTP_HOST,
  //   port: process.env.MAILTRAP_SMTP_PORT,
  //   auth: {
  //     user: process.env.MAILTRAP_SMTP_USER,
  //     pass: process.env.MAILTRAP_SMTP_PASS,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "umarfarooq567800@gmail.com",
      pass: process.env.PASS,
    },
  });

  const mail = {
    from: "http://localhost:8000", // We can name this anything. The mail will go to your Mailtrap inbox
    to: options.email, // receiver's mail
    subject: options.subject, // mail subject
    text: emailTextual, // mailgen content textual variant
    html: emailHtml, // mailgen content html variant
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    // As sending email is not strongly coupled to the business logic it is not worth to raise an error when email sending fails
    // So it's better to fail silently rather than breaking the app
    console.error(
      "Email service failed silently. Make sure you have provided your credentials in the .env file"
    );
    console.error("Error: ", error);
  }
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  console.log("sendEmail called,");
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of our account",
      action: {
        instructions:
          "To reset your password click on the following button or link:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! We're very excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const contactSupportMailgenContent = (
  fullName,
  email,
  phone,
  services = [],
  message
) => {
  return {
    body: {
      greeting: "Hello Health AI Support Team,",
      intro: `${fullName} has reached out for support. Below are their details:`,

      table: {
        data: [
          {
            Field: "<strong style='color:'color: #111'>Full Name</strong>",
            Value: fullName,
          },
          {
            Field: "<strong style='color:'color: #111'>Email</strong>",
            Value: email,
          },
          {
            Field: "<strong style='color:'color: #111'>Phone</strong>",
            Value: phone || "Not provided",
          },
          {
            Field: "<strong>Services Interested</strong>",
            Value: services.length ? services.join(", ") : "Not specified",
          },
        ],
        columns: {
          customWidth: {
            Field: "40%",
            Value: "60%",
          },
          customAlignment: {
            Field: "left",
            Value: "left",
          },
        },
      },

      outro: `<strong style='color:'color: #111'>Message:</strong> \n\n${
        message || "No additional message provided."
      }<br></br> \n\nPlease respond to ${email} as soon as possible.`,
    },
  };
};

export {
  sendEmail,
  forgotPasswordMailgenContent,
  emailVerificationMailgenContent,
  contactSupportMailgenContent,
};
