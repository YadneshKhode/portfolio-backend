let express = require("express");
var morgan = require("morgan");
let cors = require("cors");
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
  res.json(entries.getEntries());
});

app.post("/entries", (req, res) => {
  console.log("Data received - ", req.body);
  entries.putEntry(req.body);
  console.log("Stored successfully!");
  res.sendStatus(200);
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Profile backend running on ${process.env.PORT} ...`);
});
