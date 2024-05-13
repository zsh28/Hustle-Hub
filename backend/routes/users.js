const express = require("express");
const { Signup, Login } = require("../controllers/AuthController");
const router = express.Router();

//post a new user
router.post("/signup", (req, res) => {
  Signup(req, res);
});

//login a user
router.post("/login", (req, res) => {
  Login(req, res);
});

module.exports = router;
