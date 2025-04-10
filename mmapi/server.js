const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");
const mealRoutes = require("./routes/mealRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/meals", mealRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
