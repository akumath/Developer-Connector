const express = require("express");
const mongoose = require("mongoose");
const connectBD = require("./config/db");
const app = express();

// BODY PARSER
app.use(express.json({ extended: false }));

// DATABASE CONNECTION
connectBD();

// ROUTES
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connect to ${PORT}`));
