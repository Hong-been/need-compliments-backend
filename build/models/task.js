"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  readPermission: {
    type: String,
    "enum": {
      values: ["everyone", "me", "none"],
      message: "{VALUE} is not matched with readPermission!"
    },
    required: true
  },
  doneAt: {
    type: Number,
    "default": new Date().getTime()
  },
  createdAt: {
    type: Number,
    "default": new Date().getTime()
  },
  updatedAt: {
    type: Number,
    "default": new Date().getTime()
  }
}, {
  timestamps: true
});

var Task = _mongoose["default"].model("Task", taskSchema);

exports.Task = Task;
//# sourceMappingURL=task.js.map