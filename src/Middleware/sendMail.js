const nodemailer = require("nodemailer");
const procees = require("../Config/mail")
// async..await is not allowed in global scope, must use a wrapper
 async function sendEmail(options) {

    let transporter = nodemailer.createTransport({
    service: procees.SERVICE,
    auth: {
      user: procees.SMTP_EMAIL, // generated ethereal user
      pass: procees.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let message = await transporter.sendMail({
    from: `${procees.FROM_NAME}<${procees.FROM_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.html
  });


const info = await transporter.sendMail(message);
console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;

