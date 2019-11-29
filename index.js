const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json());

var connection = mysql.createConnection(
  "mysql://ba5210ce854208:42019017@us-cdbr-iron-east-05.cleardb.net/heroku_8b376def7021cf9?reconnect=true"
);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

const customers = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Brad", lastName: "Traversy" },
  { id: 3, firstName: "Mary", lastName: "Swanson" }
];

app.get("/api/customers", (req, res) => {
  res.json(customers);
});

app.post("/api/customers", (req, res) => {
  const newCostumer = {
    id: req.params.id,
    firstName: "Luis",
    lastName: "Jaquez"
  };
  customers.push(newCostumer);
  res.json(customers);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("listening in port " + PORT));
