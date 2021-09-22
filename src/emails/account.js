const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "dangtiendat288@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "dangtiendat288@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};

// sgMail
//   .send({
//     to: "dangtiendat288@gmail.com",
//     from: "dangtiendat288@gmail.com",
//     subject: "This is my first email!",
//     text: "I hope this one actually get to you.",
//   })
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });