import mongoose from "mongoose";
const {Schema} = mongoose;

const complitmentSchema = new Schema(
	{
		task: {type: String, required: true},
		author: {type: String, required: true},
		doneAt: {type: Number, default: new Date().getTime()},
		createdAt: {type: Number, default: new Date().getTime()},
		updatedAt: {type: Number, default: new Date().getTime()},
		type: {
			type: String,
			enum: {
				values: ["party-popper", "thumbs-up", "clapping-hands", "red-heart"],
				message: `{VALUE} is not matched with compliment type!`,
			},
			required: true,
		},
	},
	{timestamps: true}
);

// POST: (task, author, type) goal데이터를 보내면 저장한다
complitmentSchema.statics.create = async (payload) => {
	const compliment = await new Compliment(payload);
	return compliment.save();
};

// GET: taskIds주면 해당되는거 가져오기
complitmentSchema.statics.findByTaskIds = async (taskIds) => {
	const result = await Compliment.find({task: {$in: taskIds}});
	const map = {};

	taskIds.forEach((taskId) => {
		map[taskId] = [];
	});

	result.forEach((item) => {
		map[item.task] && map[item.task].push(item);
	});

	return map;
};

complitmentSchema.statics.findByTaskId = async (taskId) => {
	return await Compliment.find({task: taskId});
};

// DELETE: complimentId를 삭제
complitmentSchema.statics.deleteByComplimentId = async (complimentId) => {
	return await Compliment.findByIdAndDelete(complimentId);
};

export const Compliment =
	mongoose.models.Compliment || mongoose.model("Compliment", complitmentSchema);
