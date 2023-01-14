const express = require("express");
const verifyToken = require("./middleware/verifyToken");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const passwordsRouter = require("./routes/passwords");
const categorysRouter = require("./routes/categorys");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

async function connect() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      `mongodb+srv://admin:De2SJrvg6cOhpN9V@cluster0.jfrmol2.mongodb.net/PasswordManager?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB DataBase");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.get("/", (req, res) => {
  res.send("Hi, welcome to Password Manager Backend RESTFUL Web-API 😍");
});
app.use("/auth", authRouter);
app.use("/users", verifyToken, usersRouter);
app.use("/passwords", verifyToken, passwordsRouter);
app.use("/categorys", verifyToken, categorysRouter);

const port = 9900;

app.listen(port, () => {
  console.log(
    `Server is started on port http://localhost:${port}/ or http://143.244.171.39/`
  );
});
