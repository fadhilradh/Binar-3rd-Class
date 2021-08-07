const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("listening");
});

const userData = {
  username: "fadhil",
  password: "12345",
  age: "18",
  address: "Semarang",
};

//separate the data without password
const { password, ...safeData } = userData;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/game", (req, res) => {
  res.render("game");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const loginReq = req.body;
  if (loginReq.username !== userData.username) {
    res.status(400).send({
      message: "Username is not registered",
    });
  } else if (loginReq.password !== userData.password) {
    res.status(400).send({ message: "Password is incorrect" });
  }
  res.status(200).send({
    message: "Login Successful",
    data: safeData,
  });
});
