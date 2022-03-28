const express = require('express');
const app = express();

app.use("/departamentos", require("./departamentos"));

module.exports = app;