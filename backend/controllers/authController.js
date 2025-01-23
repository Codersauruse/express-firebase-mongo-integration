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

const register = async (req, res) => {
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

const login = async (req, res) => {
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

//for handling social media logins

const googleLogin = async (req, res) => {
  try {
    console.log("yo");
    const { uid, email, name } = req.user;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Username and email are required",
      });
    }
    console.log("yo yo");
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Assume Google login bypasses traditional credential checks
    const token = createToken(user._id, name, user.role);
    console.log(token);
    return res.status(200).json({
      success: true,
      id: user._id,
      username: name,
      roles: user.role,
      token: token,
    });
    
  } catch (error) {
    console.error("Error in googleLogin:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const googleRegister = async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    // Validate input
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid email format" });
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
      name: name,
      email: email,
      authProvider: "google",
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

module.exports = { register, login, googleLogin, googleRegister };
