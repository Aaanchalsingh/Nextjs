import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {

    const hashedToken = await bcryptjs.hash(userID.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID,
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userID,
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a7c82e2718a3d9",
        pass: "115c9d0a144464",
      },
    });
    const options={
        from:"aanchalsinghuk@gmail.com",
        to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
    }
    const reponse=await transport.sendMail(options);
    return reponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
