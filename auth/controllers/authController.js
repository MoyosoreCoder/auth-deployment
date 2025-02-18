const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) throw new Error("SECRET_KEY is not defined");

// 1️⃣ REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, pin, phoneNumber, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password and PIN
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedPin = await bcrypt.hash(pin, saltRounds);

    // Create new user
    user = new User({ name, email, phoneNumber, password: hashedPassword, pin: hashedPin, role });

    await user.save();
    
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 2️⃣ LOGIN STEP 1: REQUEST PIN
exports.requestPin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate a temporary session token (valid for 5 minutes)
    const tempToken = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "5m" });

    return res.status(200).json({ message: "Enter your PIN", tempToken });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 3️⃣ LOGIN STEP 2: VERIFY PIN
exports.verifyPin = async (req, res) => {
  try {
    const { pin, tempToken } = req.body;

    if (!pin || !tempToken) return res.status(400).json({ message: "PIN and temporary token are required" });

    let decoded;
    try {
      decoded = jwt.verify(tempToken, SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid session" });

    const isPinMatch = await bcrypt.compare(pin, user.pin);
    if (!isPinMatch) return res.status(401).json({ message: "Incorrect PIN" });

    // Generate final authentication token
    const authToken = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "7d" });

    return res.status(200).json({
      message: "Login successful",
      authToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
