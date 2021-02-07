const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());

const users = [
  {
    username: "john",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "anna",
    password: "password123member",
    role: "member",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      data: {
        token,
      },
    });
  } else {
    res.status(401).json({
      error: {
        msg: "Incorrect username or password",
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
