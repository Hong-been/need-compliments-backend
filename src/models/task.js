import mongoose from "mongoose";
import {readPermissionTypes} from "../utils/types.js";
const {Schema} = mongoose;

const taskSchema = new Schema(
	{
		title: {type: String},
		goal: {type: String, required: true},
		author: {type: String, required: true},
		readPermission: {
			type: String,
			enum: {
				values: readPermissionTypes,
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
	const task = await new Task(payload).save();
	return task.toObject();
};

// GET: author를 주면 모든 task 가져오기
taskSchema.statics.findByUserId = async (author) => {
	return await Task.find({author}).lean();
};

taskSchema.statics.findByQueriesTasks = async (queries, limit, offset) => {
	const {readPermission, userId, start, end} = queries;
	const options = {
		readPermission: readPermission || {$exists: true},
		userId: userId || {$exists: true},
		doneAt: start && end ? {$gte: start, $lte: end} : {$exists: true},
	};
	return await Task.find(options)
		.sort({doneAt: -1})
		.skip(offset)
		.limit(limit)
		.lean();
};

// PATCH: taskId를 주면 task로 업데이트 진행
taskSchema.statics.patchByTaskId = async (taskId, task) => {
	return await Task.findByIdAndUpdate(
		taskId,
		{
			title: task.title && task.title,
			doneAt: task.doneAt && task.doneAt,
			updatedAt: new Date().getTime(),
		},
		{new: true}
	).lean();
};

// DELETE: taskId를 삭제
taskSchema.statics.deleteByTaskId = async (taskId) => {
	return await Task.findByIdAndDelete(taskId);
};

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
