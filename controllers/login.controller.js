import { User } from "../models";
import jwt from "jsonwebtoken";

const login =
  ("/login",
  async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
      const token = jwt.sign(
        { username: user.username },
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

export default login;
