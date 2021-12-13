const express = require("express");
const app = express();
const userRouter = require("./userRouter");
const ordersRouter = require("./ordersRouter");

app.use("/api", userRouter);
app.use("/api", ordersRouter);

module.exports = app;
