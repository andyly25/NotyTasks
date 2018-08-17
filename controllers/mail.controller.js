const nodemailer = require('nodemailer');

const { EMAIL_UN, EMAIL_PW } = require('../config');

exports.postMail = (req, res) => {
  console.log('POSTMAIL', req.body);
  const output = `
    <p>You have a task to complete!</p>
    <h3>${req.body.title}</h3>
    <ul>  
      <li>Username: ${req.user.username}</li>
      <li>category: ${req.body.category}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.content}</p>
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
    from: `"Nodemailer Contact" <${EMAIL_UN}>`, // sender address
    to: `${req.user.username}`, // list of receivers
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
      res.status(201).json({messageAlert: 'It worked'});
    }
  });
};
