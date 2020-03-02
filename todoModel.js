import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    id: Number,
    body: String,
    completed: Boolean,
    due: Date,
})

const Todo = module.exports = mongoose.model('todo', todoSchema);
module.exports.get = (callback, limit) => Todo.find(callback).limit(limit);