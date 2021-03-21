let express = require("express");
var morgan = require("morgan");
let cors = require("cors");
const nodemailer = require("nodemailer");
// let bodyParser = require('body-parser')
let entries = require("./entries");
const dotenv = require("dotenv");

dotenv.config();
let app = express();
app.use(morgan("dev"));
app.use(cors());
// app.use(bodyParser.json())
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello From Backend");
});
app.get("/entries", (_, res) => {
  res.json(hiringentity);
});

app.post("/entries", (req, res) => {
  console.log("Data received - ", req.body);
  entries.putEntry(req.body);
  // sendMailToMe();
  console.log("Stored successfully!");
  res.sendStatus(200);
});

const sendMailToMe = () => {
  const hiringentity = entries.getEntries();
  console.log(hiringentity);
  const name = hiringentity.name;
  console.log(name);
  const email = hiringentity.email;
  console.log(email);
  const message = hiringentity.message;
  console.log(message);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: "hiringthroughportfolio001@gmail.com", // sender address
    to: "yadneshkhode@gmail.com,yadneshk71@gmail.com", //list of receivers
    subject: `HIRING THROUGH YOUR PORTFOLIO - ${name}`, // Subject line
    text: message, // plain text body
    html: `<b>Hello my name is ${name} and Email id to contact me is ${email}</b> and my message = ${message}`, // html body
  });
};

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Profile backend running on ${process.env.PORT} ...`);
});
