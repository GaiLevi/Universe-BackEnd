var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var postsRouter = require("./routes/posts/posts-routes");
var usersRouter = require("./routes/users/users-routes");
var authRouter = require("./routes/auth/auth-routes");
var notificationRouter = require("./routes/notifications/notification-routes");
var app = express();
const http = require("http").createServer(app);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
const cors = require("cors");
const { setupSocketAPI } = require("./services/socket.service");

// Use the CORS middleware
const corsOptions = {
  // Make sure origin contains the url your frontend is running on
  origin: [
    "http://localhost:3001",
    "http://localhost:3000",
    "https://universe-frontend.onrender.com",
    "*",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/notification", notificationRouter);
require("./models/database.js");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log("Server is running on port: " + port);
});
setupSocketAPI(http);
module.exports = app;
