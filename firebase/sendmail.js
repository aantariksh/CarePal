const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


// SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass
  },
  // logger: true, // log to console
  // debug: true // include SMTP traffic in the logs
}, {from: "no-reply@carepalmoney.com"});


// Express App
const app = express();
app.use(bodyParser.json());

// POST endpoint to receive customer details
app.post('/send-email', (req, res) => {
  try {
    sendNotificationEmail(req.body)
    sendAcknowledgmentEmail(req.body)
  } catch (error) {
    console.log("Error parsing request body", error);
  } finally {
    return res.end();
  }
});

async function sendNotificationEmail(body) {
  try {
    const { name, telephone, email, salary, treatment, loanAmount } = body;
    const mailOptions = {
      to: "contact@carepalmoney.com",
      subject: "New Loan Application Request",
      text: `
We have received a new information to be reviewed.

Here are the details you provided:

Full Name: ${name || ''}
Email Address: ${email || ''}
Phone Number: ${telephone || ''}
Loan Amount: ${loanAmount || ''}
Purpose of Loan: ${treatment || ''}
Salary: ${salary || ''}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Acknowledgment email sent:", info.response);
  } catch (error) { console.log(error) }
}

// Function to send acknowledgment email
async function sendAcknowledgmentEmail(body) {
  try {
    const { name, telephone, email, salary, treatment, loanAmount } = body;
    // Define the email options
    const mailOptions = {
      to: email,
      subject: "Loan Application Acknowledgment",
      text: `Dear ${name || ''},

Thank you for submitting your loan requirements on our website. We have received your information and will review it promptly.

Here are the details you provided:

Full Name: ${name || ''}
Email Address: ${email || ''}
Phone Number: ${telephone || ''}
Loan Amount: ${loanAmount || ''}
Purpose of Loan: ${treatment || ''}
Salary: ${salary || ''}

Our team will carefully evaluate your requirements and get back to you soon. If we need any further information or documents, we will reach out to you.
If you have any questions or need assistance, please don't hesitate to contact our customer support team at contact@carepalmoney.com or 1800 121 8200.

Thank you for choosing us as your financial partner.

Best regards,      
CarePal Money team
contact@carepalmoney.com
info@carepalmoney.com
1800 121 8200
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Acknowledgment email sent:", info.response);
  } catch (error) {
    console.log("Error sending acknowledgment email:", error);
  }
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
