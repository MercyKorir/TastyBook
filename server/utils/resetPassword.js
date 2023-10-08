import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const { RESET_SECRET_KEY, EMAIL_USERNAME, EMAIL_PWD } = process.env;

export function generateResetToken(user) {
  return jwt.sign({ userId: user._id }, RESET_SECRET_KEY, {
    expiresIn: "1h",
  });
}

export async function sendPasswordResetEmail(user, token) {
  const { email, username } = user;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PWD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
  const mailOptions = {
    from: "tasty.book.2023@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Email Received`,
    html: `
      <b>Hello ${username},</b>
      <p>Your reset password token is ${token}</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent");
  } catch (err) {
    console.error("Error sending password reset email: ", err);
  }
}
