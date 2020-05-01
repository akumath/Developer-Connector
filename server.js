const express = require("express");
const mongoose = require("mongoose");
const connectBD = require("./config/db");
const app = express();

// JSON PARSER
app.use(express.json());

// DATABASE CONNECTION
connectBD();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connect to ${PORT}`));
