"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Goal = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var goalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    "default": new Date().getTime()
  },
  updatedAt: {
    type: Number,
    "default": new Date().getTime()
  },
  readPermission: {
    type: String,
    "enum": {
      values: ["everyone", "me", "none"],
      message: "{VALUE} is not matched with readPermission!"
    },
    required: true
  }
}, {
  timestamps: true
});

var Goal = _mongoose["default"].model("Goal", goalSchema);

exports.Goal = Goal;
//# sourceMappingURL=goal.js.map