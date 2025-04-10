const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const mealRoutes = express.Router();

mealRoutes.post("/save", async (req, res) => {
  const { email, meals, plan } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM mm.users WHERE email = $1",
      [email]
    );
    if (!userExists.rows.length > 0) {
      return res.status(400).json({ message: "ERROR: User does not exist!" });
    }
    console.log(userExists);

    const mPlan = await pool.query(
      "INSERT INTO mm.mplan (uid, meals, pname) VALUES ($1, $2, $3) RETURNING *",
      [userExists.rows[0].uid, meals, plan]
    );

    res
      .status(201)
      .json({ message: "Meal plan saved successfully", mealPlan: mPlan.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR: Server error" });
  }
});

module.exports = mealRoutes;