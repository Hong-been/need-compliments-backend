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

userSchema.statics.create = (payload) => {
	const todo = new this(payload);
	return todo.save();
};

userSchema.statics.findOneByUserID = (userId) => {
	return this.findOne({userId});
};

userSchema.statics.deleteByUserID = (userId) => {
	return this.remove({userId});
};

export const User = mongoose.model("User", userSchema);
