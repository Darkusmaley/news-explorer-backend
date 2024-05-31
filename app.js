require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");
const errorHandler = require("./Components/middlewares/errorHandler");
const {
  requestLogger,
  errorLogger,
} = require("./Components/middlewares/logger");


const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./Components/routes/index");
const { limiter } = require("./Components/utils/limiter");
const { MONGO_DB_CONNECTION } = require("./Components/utils/config");

app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(MONGO_DB_CONNECTION)
  .then(() => {
    console.log("Connected to News-Explorer_DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
