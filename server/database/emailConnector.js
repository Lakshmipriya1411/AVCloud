var nodemailer = require("nodemailer");

const sendEmail = (results) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ccountry86@gmail.com", // create admin gmail & add it here
          pass: "testcc@123", // password 
        },
      });
      
      var mailOptionsList = [];

      results.forEach((element) => {
        mailOptionsList.push(
          {
            from: "ccountry86@gmail.com", // admin gmail id
            to: element.email_id,
            subject: "Country Club Event " + element.event_name + " Cancelled",
            text: "Hi " + element.f_name + "\nSorry but event " + element.event_name + " is cancelled. \nThank you!",
          }
        );
      });

      mailOptionsList.forEach((element) => {
        transporter.sendMail(element, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      })
      
      
};

// provide access using this link https://myaccount.google.com/lesssecureapps  for admin gmail account

module.exports = sendEmail;

// import sendEmail in your js & 
// call using sendEmail("to address", "sub" , "content")