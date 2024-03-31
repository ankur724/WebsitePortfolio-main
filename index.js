const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Serve static files from the "assets" directory
app.use(express.static('assets'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Handle POST requests to the root URL
app.post('/', function (req, res) {
  const comm = req.body.message;
  const na = req.body.username;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ankursaxena2002@gmail.com',
      pass: 'cdkg qzvq xids ezgf' 
    }
  });

  // Setup email data
// Setup email data
let mailOptions = {
  from: 'ankursaxena2002@gmail.com',
  to: req.body.usermail,
  subject: 'Thank You for Getting in Touch, ' + na + '!',
  text: `Dear ${na},

Thank you for reaching out to us! We greatly appreciate you taking the time to contact us.

Your message has been received, and I will get back to you as soon as possible.
Message Details:

-----------------
${comm}

Best Regards,
Ankur Saxena`
};




  // let mailOptions = {
  //   from: 'ankursaxena2002@gmail.com',
  //   to: req.body.usermail,
  //   subject: 'Thanks for Contacting us ' + na,
  //   text: 'Thanks for your message you have sent to us --> ' + comm
  // };

  // Send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      // Redirect the user after sending the email
      res.redirect('/');
    }
  });
});

// Start the server
const port = process.env.PORT;

app.listen(port, function() {
    console.log("Server started at port " + port);
});