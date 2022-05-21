import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema(
	{
		userId: {type: String, required: true, unique: true},
		name: {type: String, required: true},
		email: {
			type: String,
			required: true,
			unique: [true, "email must be unique"],
		},
		image: String,
		createdAt: {type: Number, default: new Date().getTime()},
		updatedAt: {type: Number, default: new Date().getTime()},
	},
	{timestamps: true}
);

userSchema.statics.create = async (payload) => {
	const user = await new User(payload);
	return user.save();
};

userSchema.statics.findOneByUserId = async (userId) => {
	return await User.findOne({userId});
};

userSchema.statics.deleteByUserId = async (userId) => {
	return await User.findOneAndDelete({userId});
};

export const User = mongoose.model("User", userSchema);
