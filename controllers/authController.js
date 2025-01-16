const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const createToken = (id, username, roles) => {
  return jwt.sign(
    { id: id, username: username, roles: roles },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const register = async () => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 6 characters long",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      name: username,
      email: email,
      password: password,
    });
    await newUser.save();

    // Send success response
    res
      .status(201)
      .json({ success: true, msg: "User registration successful" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ success: false, msg: "Server error. Please try again later." });
  }
};

const login = async () => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "user doesn't exists" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = createToken(user._id, username, user.role);

        res.status(201).json({
          success: true,
          id: user._id,
          username: username,
          roles: user.role,
          token: token,
        });
      } else {
        res.status(500).json({ success: false, msg: "invalid credintials" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, msg: error.message });
    }

};

module.exports = { register, login };
