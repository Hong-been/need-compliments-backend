import mongoose from "mongoose";
const {Schema} = mongoose;

const counterSchema = new Schema({
	sequence_counter: {type: Number, required: true},
});

// https://velog.io/@gytlr01/mongodb-%EC%9E%90%EB%8F%99-%EB%B2%88%ED%98%B8-%EC%A6%9D%EA%B0%80-%EA%B5%AC%ED%98%84
counterSchema.statics.getNextSequenceValue = async (sequenceName) => {
	const sequenceDocument = await Counter.findOneAndUpdate(
		{_id: id},
		{$inc: {sequence_counter: 1}},
		{returnOriginal: false}
	);

	return sequenceDocument.value.sequence_counter;
};

export const Counter = mongoose.model("Counter", counterSchema);
