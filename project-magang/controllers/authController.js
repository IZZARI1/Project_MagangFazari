const bcrypt = require("bcryptjs");
const db = require("../db");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
      [username, hash, role || "user"]
    );
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
