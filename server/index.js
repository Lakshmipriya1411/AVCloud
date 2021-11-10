const express = require("express");
const cors = require("cors");
const router = require("./routers/mainRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("./modules/logger");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
// set & reset login cookies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Adds session for each user login
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);
//All node server requests handled here.
app.use("/", router);

//Node port number
app.listen(3001, () => {
  console.log("running server");
});

//Logging log4js
app.use(logger.express);
