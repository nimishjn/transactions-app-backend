const mailer = require("./mailer");
const generateAccessToken = require("../scripts/JWTGenerator");

async function sendVerificationEmail(emailId, host) {
  const verificationToken = generateAccessToken({
    username: emailId,
  });
  const subject = "Do Not Reply - Email Verification";
  const content = `
    Hello user,

    Greetings from XYZ Company. Please verify your email id (${emailId}) by clicking the link below.
    http://${host}/confirmEmail/${verificationToken}

    Regards,
    Developers Hub
  `;

  const res = await mailer(emailId, subject, content);

  return res;
}

module.exports = { sendVerificationEmail };
