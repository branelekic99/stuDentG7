const nodemailer = require("nodemailer");

exports.sendEmail = async (receiver, password) => {

  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "jelena.kicic@student.etf.unibl.org", 
      pass: "LrsCxvzPREjqfB67", 
    },
  });


  let info = await transporter.sendMail({
    from: '"StuDent" <jelena.kicic@student.etf.unibl.org>', // sender address
    to: receiver,//receiver, // list of receivers
    subject: "Dobro došli na StuDent", // Subject line
    html: "<t1>Vaša lozinka je<br/><b>" + password + "</b></t1>", // html body
  });
}