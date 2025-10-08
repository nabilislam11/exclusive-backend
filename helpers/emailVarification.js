const nodemailer = require("nodemailer");
async function emailVarification(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nabilhamja11@gmail.com",
      pass: "mmksbzalqhhhnomw",
    },
  });
  await transporter.sendMail({
    from: '"NabilTech" <nabilhamja11@gmail.com>',
    to: email,
    subject: "Assalamu walaikum  ✔",
    text: "Dear Sir/Mam?", // plain‑text body
    html: `Please see your otp
    <span style ="font-weight: bold;" >${otp} </span>
     .and plase verify your email account`, // HTML body
  });
}
module.exports = emailVarification;
