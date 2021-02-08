import { User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login =
  ("/login",
  async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    const user = await User.findOne({
      username: username,
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
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
            msg: "Incorrect password",
          },
        });
      }
    } else {
      res.status(401).json({
        error: {
          msg: "Incorrect username",
        },
      });
    }
  });

export default login;
