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
		doneAt: Number,
		createdAt: Number,
		updatedAt: Number,
	},
	{timestamps: true}
);

// Create Model & Export
// 실제 collection의 이름은 ‘Tasks’로 자동 변환되어 사용된다.
export const Task = mongoose.model("Task", taskSchema);
