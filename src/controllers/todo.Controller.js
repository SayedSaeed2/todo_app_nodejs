const Todo = require('../models/Todo')
const mongoose = require('mongoose')

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({createAt: -1});
        res.status(200).json(todos);
    } catch (error) {
        log.error(error);
    }
}

const getTodoById = async (req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid ID"});
        }
        const todoId = await Todo.findById(id);
        if(!todoId){
            return res.status(404).json({message: "Todo not found"});
        }

        res.status(200).json(todoId);
    } catch (error) {
        log.error(error);
    }
}

const updateTodoById = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, completed} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid ID"});
        }
        const updates = {};

        if(title !== undefined) updates.title = typeof title === 'string' ? title.trim() : title;
        if(completed !== undefined) updates.completed = completed === true;

        const todo = await Todo.findByIdAndUpdate(id, updates, {new: true});

        if(!todo){
            return res.status(400).json({message: "Todo not found"});
        }

        res.status(200).json(todo);

    } catch (error) {
        log.error(error);
    }
}

const createTodo = async (req, resp) => {
    try {
        const {title, completed} = req.body;

        if(!title || typeof title !== 'string' || !title.trim()){
            return resp.status(400).json({message: 'Title is required'})
        }

        const todo = new Todo({title: title.trim(), completed: completed === true});
        await todo.save();
        resp.status(201).json(todo);
    } catch (error) {
        // res.status(500).json({message: 'Error creating todo ', error: error.message});
        console.error(error);
        resp.status(500).json({message: 'Server Erro'});
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid ID"});
        }

        const todoId = await Todo.findByIdAndDelete(id);
        
        if(!todoId){
            return res.status(404).json({message: "Todo not found"});
        }

        res.status(204).json({message: "Todo deleted successfully !"});

    } catch (error) {
        log.error(error);
    }
}


module.exports = {
    getTodos,
    getTodoById, 
    updateTodoById,
    createTodo,
    deleteTodo
};