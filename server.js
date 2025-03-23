// require("dotenv").config();
// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// const generateEmailTemplate = (
//   name,
//   address,
//   number,
//   email,
//   availability,
//   acUnits,
//   details
// ) => `
//  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background: #f4f4f4; border-radius: 10px;">
//     <div style="background: #2f7baa; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
//       <h2 style="color: #ffffff; margin: 0;">Service Request</h2>
//     </div>
//     <div style="padding: 20px; background: #ffffff; border-radius: 0 0 10px 10px;">
//       <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
//       <p style="font-size: 16px;"><strong>Address:</strong> ${address}</p>
//       <p style="font-size: 16px;"><strong>Number:</strong> ${number}</p>
//       <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
//       <p style="font-size: 16px;"><strong>AC Units:</strong> ${acUnits}</p>
//       <p style="font-size: 16px;"><strong>Availability:</strong> ${availability}</p>
//       <p style="font-size: 16px;"><strong>Details:</strong> ${
//         details || "No additional details provided"
//       }</p>
//       <div style="margin-top: 20px; text-align: center;">
//         <a href="mailto:${email}" style="background: #2f7baa; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reply</a>
//       </div>
//     </div>
//   </div>
// `;

// app.post("/send-email", async (req, res) => {
//   try {
//     console.log('req.body',req.body);
    
//     const { name, address, number, email, acUnits, availability, details } =
//       req.body;

//     if (!name || !address || !number || !email || !acUnits || !availability) {
//       return res
//         .status(400)
//         .json({ error: "All required fields must be filled!" });
//     }
// console.log('process.env.EMAIL',process.env.EMAIL, process.env.PASSWORD);

//     const mailOptions = {
//       from: `"Primevents Purifiers" <${process.env.EMAIL}>`,
//       //   from: process.env.EMAIL,
//       to: email,
//       subject: `New Service Request from ${name}`,
//       html: generateEmailTemplate(
//         name,
//         address,
//         number,
//         email,
//         acUnits,
//         availability,
//         details
//       ),
//     };     

//     console.log(mailOptions);

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Service request sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ error: "Internal server error. Please try again." });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const generateEmailTemplate = (
  name,
  address,
  number,
  email,
  availability,
  acUnits,
  details
) => `
 <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background: #f4f4f4; border-radius: 10px;">
    <div style="background: #2f7baa; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
      <h2 style="color: #ffffff; margin: 0;">Service Request</h2>
    </div>
    <div style="padding: 20px; background: #ffffff; border-radius: 0 0 10px 10px;">
      <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px;"><strong>Address:</strong> ${address}</p>
      <p style="font-size: 16px;"><strong>Number:</strong> ${number}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px;"><strong>AC Units:</strong> ${acUnits}</p>
      <p style="font-size: 16px;"><strong>Availability:</strong> ${availability}</p>
      <p style="font-size: 16px;"><strong>Details:</strong> ${details || "No additional details provided"}</p>
      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${email}" style="background: #2f7baa; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Reply</a>
      </div>
    </div>
  </div>
`;

app.post("/send-email", async (req, res) => {
  try {
    console.log("Request Data:", req.body);

    const { name, address, number, email, acUnits, availability, details } = req.body;

    if (!name || !address || !number || !email || !acUnits || !availability) {
      return res.status(400).json({ error: "All required fields must be filled!" });
    }

    console.log("Sender Email:", process.env.EMAIL); // ✅ Safe logging
    console.log("Receiver Email:", process.env.RECEIVER_EMAIL); // ✅ Ensure it's correct

    const mailOptions = {
      from: `"Primevents Purifiers" <${email}>`,
      to: process.env.EMAIL, // ✅ Correct recipient (Admin)
      subject: `New Service Request from ${name}`,
      html: generateEmailTemplate(name, address, number, email, acUnits, availability, details),
    };

    console.log("Mail Options:", mailOptions);

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Service request sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
