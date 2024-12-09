const epxress = require("express");
const DBConnection = require("./config/DBConnection");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/error_middleware");
require("dotenv").config();
const server = epxress();
const cors = require("cors");
const morgan = require("morgan");

//Database Connection
DBConnection();

//Middlewares
server.use(morgan("dev"));
server.use(
  cors({
    origin: [
      process.env.FRONTEND_URI,
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);
server.use(epxress.json());

//Routes
server.use("/api/auth", require("./routes/auth_route"));
server.use("/api/users", require("./routes/users_auth"));
server.use("/api/posts", require("./routes/posts_route"));
server.use("/api/comments", require("./routes/comments_route"));
server.use("/api/categories", require("./routes/category_route"));

server.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

//Global error
server.use(globalError);
//Server Connection
const port = process.env.PORT || 8000;
server.listen(port, () =>
  console.log(`The server in ${process.env.NODE_ENV} on port : ${port}`)
);
