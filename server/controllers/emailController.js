const nodemailer = require("nodemailer");
const config = require(__dirname + '/../config/smtpConfig.json');

exports.sendEmail = async (receiver, password) => {

  let transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    auth: {
      user: config.user, 
      pass: config.pass, 
    },
  });


  let info = await transporter.sendMail({
    from: '"StuDent" <jelena.kicic@student.etf.unibl.org>', // sender address
    to: receiver,//receiver, // list of receivers
    subject: "Dobro došli na StuDent", // Subject line
    html: "<t1>Vaša lozinka je<br/><b>" + password + "</b></t1>", // html body
  });
}