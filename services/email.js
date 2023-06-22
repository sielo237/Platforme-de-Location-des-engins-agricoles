const nodemailer = require('nodemailer');
require('dotenv').config();

// Fonction pour envoyer un e-mail
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.GMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès');
    transporter.close();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail:", error);
  }
};

module.exports = { sendEmail };
