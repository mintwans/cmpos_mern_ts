const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
var bcrypt = require("bcryptjs");
const jwt = require("./jwt");
const randtoken = require("rand-token"); // yarn add rand-token
const refreshTokens = {};

router.post("/login", async (req, res) => {
  let doc = await Users.findOne({ username: req.body.username });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      const payload = {
        id: doc._id,
        level: doc.level,
        username: doc.username,
      };

      let token = jwt.sign(payload, "10000000"); // unit is millisec
      const refreshToken = randtoken.uid(256);
      refreshTokens[refreshToken] = req.body.username;

      res.json({
        result: "ok",
        token,
        refreshToken,
        message: "Login successfully",
      });
    } else {
      // Invalid password
      res.json({ result: "nok", message: "Invalid password" });
    }
  } else {
    // Invalid username
    res.json({ result: "nok", message: "Invalid username" });
  }
});

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 8).then((hashPassword) => {
    req.body.password = hashPassword;
    Users.create(req.body)
      .then((doc) => {
        res.json({ result: "ok", doc });
      })
      .catch((error) => {
        res.json({ result: "nok", error });
      });
  });
});

// Refresh Token
let count = 1;
router.post("/refresh/token", function (req, res) {
  const refreshToken = req.body.refreshToken;
  console.log("Refresh Token : " + count++);

  if (refreshToken in refreshTokens) {
    const payload = {
      username: refreshTokens[refreshToken],
      level: "normal",
    };
    const token = jwt.sign(payload, "20000"); // unit is millisec
    res.json({ jwt: token });
  } else {
    console.log("Not found");
    return res
      .status(403)
      .json({ auth: false, message: "Invalid refresh token" });
  }
});

module.exports = router;
