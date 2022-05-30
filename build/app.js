"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users"));

var _goals = _interopRequireDefault(require("./routes/goals"));

var _tasks = _interopRequireDefault(require("./routes/tasks"));

var _compliments = _interopRequireDefault(require("./routes/compliments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 3000;
var app = (0, _express["default"])();
var whiteList = ["http://localhost:3000", "https://need-compliments-sandy.vercel.app"];
var corsOption = {
  origin: function origin(_origin, callback) {
    if (!_origin || whiteList.indexOf(_origin) > -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed origin! : ".concat(_origin)));
    }
  }
};
app.use((0, _cors["default"])(corsOption));
app.use(_bodyParser["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use("/users", _users["default"]);
app.use("/goals", _goals["default"]);
app.use("/tasks", _tasks["default"]);
app.use("/compliments", _compliments["default"]);

_mongoose["default"].connect(process.env.MONGODB_URI).then(function () {
  return console.log("\u2705 Connected to DB~!");
})["catch"](function (e) {
  return console.log("\u274C Error on DB connection: ".concat(e));
});

app.listen(PORT, function () {
  console.log("Example App listening on port ".concat(PORT));
});
//# sourceMappingURL=app.js.map