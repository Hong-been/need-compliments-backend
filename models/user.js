import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema(
	{
		name: {type: String, required: true},
		email: {type: String, required: true, unique: true},
		image: String,
		createdAt: Number,
		updatedAt: Number,
	},
	{timestamps: true}
);

export const User = mongoose.model("User", userSchema);
