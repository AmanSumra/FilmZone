// Load environment variables FIRST, before any other imports
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./app/routes/routes");
const bodyParser = require("body-parser");
const path = require("path");
var multer = require("multer");
const compression = require("compression");
const connectdb = require("./app/config/database");
const { verifyTransporter } = require("./app/utils/mailer");

app.set("view engine", "ejs");

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression());

app.use(express.static(path.join(__dirname, "./uploads")));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: "50mb",
  extended: true,
}));

const upload = multer({ dest: __dirname + "/uploads/" });

app.use(routes);

app.get("/", (req, res) => {
  res.send("Ok It's Done!!!");
});

connectdb();

// Verify SMTP connection on startup
verifyTransporter();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runnning on ${PORT} ........`);
});
