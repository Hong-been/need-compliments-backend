"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compliment = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var complitmentSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  author: {
    type: String,
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
  },
  type: {
    type: String,
    "enum": {
      values: ["party-popper" | "thumbs-up" | "clapping-hands" | "red-heart"],
      message: "{VALUE} is not matched with compliment type!"
    },
    required: true
  }
}, {
  timestamps: true
});

var Compliment = _mongoose["default"].model("Compliment", complitmentSchema);

exports.Compliment = Compliment;
//# sourceMappingURL=compliment.js.map