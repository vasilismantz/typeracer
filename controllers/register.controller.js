import { User } from "../models";

export const register =
  ("/register",
  async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ username });

    if (!userExists) {
      try {
        const user = await User.create({
          username,
          email,
          password,
        });
        res.status(200).json({
          data: {
            msg: "Successfully registered",
            user,
          },
        });
      } catch (e) {
        res.json({
          error: {
            msg: e.message,
          },
        });
      }
    } else {
      res.status(401).json({
        error: {
          msg: "Username already exists",
        },
      });
    }
  });
