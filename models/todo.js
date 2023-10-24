const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    status:{
        type:String,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
})

module.exports = mongoose.model('Todo', todoSchema, 'todos');