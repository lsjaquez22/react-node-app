const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const dbConnectionSQL = require("./db/connectionSQL");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./passport-config");
require("dotenv").config();

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [];

app.get("/api/customers", (req, res) => {
  dbConnectionSQL.query(
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

app.get("/api/getAuth", (req, res) => {
  res.json(true);
});

app.get("/api/getList", (req, res) => {
  var list = [{ nombre: "item1" }, { nombre: "item2" }, { nombre: "item3" }];
  res.json(list);
});

app.post("/api/register", async (req, res) => {
  try {
    const hashedPaswword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPaswword
    });
    res.redirect("/login");
  } catch {}
});

app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("listening in port " + PORT));
