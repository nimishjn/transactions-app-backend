const nodemailer = require("nodemailer");

async function mailer(mailTo, mailSubject, mailContent) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: mailTo,
    subject: mailSubject,
    text: mailContent,
  };

  return transporter
    .sendMail(mailOptions)
    .then((data) => {
      console.log("> mailer.js - Email sent successfully to " + mailTo);
      return true;
    })
    .catch((error) => {
      console.log("! mailer.js - Error sending email to " + mailTo + err);
      return false;
    });
}

module.exports = mailer;
