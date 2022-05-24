import mongoose from "mongoose";
const {Schema} = mongoose;

const goalSchema = new Schema(
	{
		name: {type: String, required: true},
		color: {type: String, required: true},
		author: {type: String, required: true},
		createdAt: {type: Number, default: new Date().getTime()},
		updatedAt: {type: Number, default: new Date().getTime()},
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

// POST: (author, name ,color, readPermission) goal데이터를 보내면 저장한다
goalSchema.statics.create = async (payload) => {
	const goal = await new Goal(payload);
	return goal.save();
};

// GET: author를 주면 모든 goal 가져오기
goalSchema.statics.findByUserId = async (author) => {
	return await Goal.find({author});
};

// PATCH: goalId를 주면 goal로 업데이트 진행
goalSchema.statics.patchByGoalId = async (goalId, goal) => {
	return await Goal.findByIdAndUpdate(goalId, {
		...goal,
		updatedAt: new Date().getTime(),
	});
};

// DELETE: goalId를 삭제
goalSchema.statics.deleteByGoalId = async (goalId) => {
	return await Goal.findByIdAndDelete(goalId);
};

export const Goal = mongoose.model("Goal", goalSchema);
