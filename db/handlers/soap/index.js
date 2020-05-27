const Todo = require("../../models/todo").Todo;

exports.getTodos = async () => {
	var arr = [];
	const result = await Todo.find().exec();
	console.log(result);
	result.forEach(el => {
		arr.push({
			id: el._id.toString(),
			text: el.text,
			due: el.due ? el.due.toString() : undefined,
			patient: el.patient,
			completed: el.completed,
		});
	});
	return arr;
}

exports.getTodo = async (args) => {
	const result = await Todo.findById(args.id).exec();
	console.log(result);
	return {
		id: result._id.toString(),
		text: result.text,
		due: result.due ? result.due.toString() : undefined,
		patient: result.patient,
		completed: result.completed,
	};
}

exports.addTodo = async (args) => {
	const result = await new Todo(args).save();
	console.log(result);
	return {
		id: result._id.toString(),
		text: result.text,
		due: result.due ? result.due.toString() : undefined,
		patient: result.patient,
		completed: result.completed,
	}
}

exports.deleteTodos = async () => {
	let deletedCount = 0;
	const result = await Todo.deleteMany({}).exec();
	console.log(result);
	deletedCount = result.deletedCount;
	return {
		deleted: deletedCount,
	};
}

exports.deleteTodo = async (args) => {
	const result = Todo.findByIdAndDelete(args.id).exec();
	console.log(result);
	return;
}

exports.updateTodo = async (args) => {
	let result;
	const id = args.id;
	delete args.id;
	if (Object.keys(args).length === 0) {
		result = await Todo.findById(id).exec();
		result = await Todo.updateOne({ _id: id }, { completed: !result.completed }).exec();
	} else {
		result = await Todo.updateOne({ _id: id }, { $set: args }).exec();
	}
	console.log(result);
}