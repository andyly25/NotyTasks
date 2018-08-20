const nodemailer = require('nodemailer');

const { EMAIL_UN, EMAIL_PW } = require('../config');

exports.postMail = (req, res) => {
  console.log('POSTMAIL', req.body);
  const output = `
    <p>Greetings from Notytask! You have a task to complete!</p>
    <h2>${req.body.title}</h2>
    <ul>  
      <li>Username: ${req.user.username}</li>
      <li>category: ${req.body.category}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.content}</p>
    <h2>Due date:</h2> 
      <h3>${req.body.date}, ${req.body.time}</h3>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_UN,
      pass: EMAIL_PW
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Nodemailer Contact" <${EMAIL_UN}>`, // sender address
    to: `${req.user.username}`, // list of receivers
    subject: `NotyTask Task Reminder for ${req.body.title}`, // Subject line
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
