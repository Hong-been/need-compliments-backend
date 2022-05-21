import mongoose from "mongoose";
const {Schema} = mongoose;

const goalSchema = new Schema(
	{
		name: {type: String, required: true},
		color: {type: String, required: true},
		author: {type: String, required: true},
		createdAt: Number,
		updatedAt: Number,
		readPermission: {
			type: String,
			enum: {
				values: ["everyone", "me", "none"],
				message: `{VALUE} is not matched with readPermission!`,
			},
			required: true,
		},
	},
	{timestamps: true}
);

export const Goal = mongoose.model("Goal", goalSchema);