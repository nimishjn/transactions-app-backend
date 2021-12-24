const nodemailer = require("nodemailer");

function mailer(mailTo, mailSubject, mailContent) {
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

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("! mailer.js - Error sending email to " + mailTo + err);
    } else {
      console.log("> mailer.js - Email sent successfully to " + mailTo);
    }
  });
}

module.exports = mailer;