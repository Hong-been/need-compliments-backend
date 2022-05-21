import mongoose from "mongoose";
const {Schema} = mongoose;

const taskSchema = new Schema(
	{
		title: {type: String, required: true},
		goal: {type: String, required: true},
		author: {type: String, required: true},
		readPermission: {
			type: String,
			enum: {
				values: ["everyone", "me", "none"],
				message: `{VALUE} is not matched with readPermission!`,
			},
			required: true,
		},
		doneAt: {type: Number, default: new Date().getTime()},
		createdAt: {type: Number, default: new Date().getTime()},
		updatedAt: {type: Number, default: new Date().getTime()},
	},
	{timestamps: true}
);

export const Task = mongoose.model("Task", taskSchema);
