import mongoose from "mongoose";
const {Schema} = mongoose;

const complitmentSchema = new Schema(
	{
		task: {type: String, required: true},
		author: {type: String, required: true},
		doneAt: Number,
		createdAt: Number,
		updatedAt: Number,
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
