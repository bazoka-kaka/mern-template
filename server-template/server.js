const express = require("express");
const path = require("path");
const { logger, errLogger } = require("./middlewares/logEvents");
const app = express();
const PORT = process.env.PORT || 3500;

// middlewares
app.use(logger);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

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
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
