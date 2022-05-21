import mongoose from "mongoose";
const {Schema} = mongoose;

const complitmentSchema = new Schema(
	{
		task: {type: String, required: true},
		author: {type: String, required: true},
		doneAt: {type: Number, default: new Data().getTime()},
		createdAt: {type: Number, default: new Data().getTime()},
		updatedAt: {type: Number, default: new Data().getTime()},
		type: {
			type: String,
			enum: {
				values: ["party-popper" | "thumbs-up" | "clapping-hands" | "red-heart"],
				message: `{VALUE} is not matched with compliment type!`,
			},
			required: true,
		},
	},
	{timestamps: true}
);

export const Compliment = mongoose.model("Compliment", complitmentSchema);
