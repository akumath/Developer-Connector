const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const config = require("config");

// @ROUTE POST api/users
// @DESC REGISTER USER
// @ACCESS PUBLIC
router.post(
  "/",
  [
    check("name", "Name is required").not().notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more charachters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // IF EMAIL ALREADY TAKEN
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ eroors: [{ msg: "User already exists" }] });
      }
      // Create avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mn",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save to bd
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ msg: err.message });
    }
  }
);

module.exports = router;
