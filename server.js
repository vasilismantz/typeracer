const express = require("express");
const bodyParser = require("body-parser");
import connect from "./lib/mongoose";
import indexRouter from "./routes/index";
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());

(async () => {
  await connect();
})();

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
