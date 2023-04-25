require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { logger, errLogger } = require("./middlewares/logEvents");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const app = express();
const PORT = process.env.PORT || 3500;

// connect to mongodb
connectDB();

// middlewares
app.use(logger);

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 - Not Found" });
  } else {
    res.type("txt").send("404 - Not Found");
  }
});

// errLogger middleware
app.use(errLogger);

// express port listening
mongoose.connection.once("open", () => {
  console.log("server is connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
