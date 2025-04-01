const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const userRouts = express.Router();

userRouts.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM mm.users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "ERROR: User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO mm.users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
      [email, name, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR: Server error" });
  }
});

userRouts.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM mm.users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "ERROR: Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "ERROR: Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user: user.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR: Server error" });
  }
});

userRouts.post("/saveProfile", async (req, res) => {
  const {
    name,
    birthday,
    gender,
    weight,
    height,
    activity,
    allergy,
    goal,
    email,
  } = req.body;

  try {
    // need to add goal, tcal, tcarb, tpro, tfat
    const query = `
      UPDATE mm.users SET name = $1,  birthday = $2, gender =$3 , weight = $4, height = $5, activity = $6 , allergy = $7, goal = $8
	    WHERE email = $9
      RETURNING *;
    `;

    const values = [
      name,
      birthday,
      gender,
      weight,
      height,
      activity,
      allergy,
      goal,
      email,
    ];
    console.log(values);
    const result = await pool.query(query, values);
    res
      .status(201)
      .json({ message: "User profile saved", user: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = userRouts;
