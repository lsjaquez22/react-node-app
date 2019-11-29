const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

var connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

const customers = [
  { id: 1, nombre: "somethhin" },
  { id: 2, nombre: "somethhing else" }
];

app.get("/api/customers", (req, res) => {
  connection.query(
    "select * from compania_mensajeria;",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/api/customers", (req, res) => {});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("listening in port " + PORT));
