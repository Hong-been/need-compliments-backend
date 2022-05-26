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
				message: `{VALUE} is not matched with everyone, me or none`,
			},
			required: true,
		},
		doneAt: {type: Number, required: true},
		createdAt: {type: Number, default: new Date().getTime()},
		updatedAt: {type: Number, default: new Date().getTime()},
	},
	{timestamps: true}
);

// POST: (title, goalId, author,readPermission, doneAt) 데이터를 보내면 저장한다
taskSchema.statics.create = async (payload) => {
	const task = await new Task(payload);
	return task.save();
};

// GET: author를 주면 모든 task 가져오기
taskSchema.statics.findByUserId = async (author) => {
	return await Task.find({author});
};

// GET: readPermission 주면 doneAt기준 최신20개 task 가져오기
// 숫자가 클수록 최신, 큰 순서대로. 내림차순!
taskSchema.statics.findPublicTasks = async (limit, offset) => {
	return await Task.find({readPermission: "everyone"})
		.sort({doneAt: -1})
		.limit(limit)
		.skip(offset);
};

// PATCH: taskId를 주면 task로 업데이트 진행
taskSchema.statics.patchByTaskId = async (taskId, task) => {
	console.log(taskId, task);
	return await Task.findByIdAndUpdate(
		taskId,
		{
			title: task.title && task.title,
			doneAt: task.doneAt && task.doneAt,
			updatedAt: new Date().getTime(),
		},
		{new: true}
	);
};

// DELETE: taskId를 삭제
taskSchema.statics.deleteByTaskId = async (taskId) => {
	return await Task.findByIdAndDelete(taskId);
};

export const Task = mongoose.model("Task", taskSchema);
