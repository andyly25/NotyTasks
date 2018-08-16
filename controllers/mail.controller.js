const nodemailer = require('nodemailer');

const { EMAIL_UN, EMAIL_PW } = require('../config');

exports.postMail = (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    // REMEMBER TO NOT LEAVE THIS HERE
    auth: {
      user: EMAIL_UN,
      pass: EMAIL_PW
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <notytask@gmail.com>', // sender address
    to: 'notytask@gmail.com', // list of receivers
    subject: 'NotyTask Sending a Hello', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.end('It worked');
    }
  });
};
