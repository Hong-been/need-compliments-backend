import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema(
	{
		name: {type: String, required: true},
		email: {type: String, required: true, unique: true},
		image: String,
		createdAt: {type: Number, default: new Data().getTime()},
		updatedAt: {type: Number, default: new Data().getTime()},
	},
	{timestamps: true}
);

export const User = mongoose.model("User", userSchema);
