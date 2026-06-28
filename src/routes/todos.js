const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo');
const mongoose = require('mongoose');
const {
    getTodos,
    getTodoById, 
    updateTodoById,
    createTodo,
    deleteTodo
} = require('../controllers/todo.Controller')



router.get('/todos', getTodos);

router.get('/todos/:id', getTodoById)

router.put('/todos/:id', updateTodoById);

router.post('/todos', createTodo);

router.delete('/todos/:id', deleteTodo)


// router.get('/', (req, res) => {
//     res.send('Hello ToDo App')
// })

// router.get('/api/todos', (req, res) => {
//     res.json({message: "Return All Todos"})
// })

// router.get('/api/todos/:id', (req, res) => {
//     const id = req.params.id;
//     res.json({message: `Return by id: ${id}`})
// })

// router.post('/api/todos', (req, res) => {
//     // const {title, description} = req.body;
//     const title = req.body.title;
//     res.status(201).json({message: `Title has create ${title}`});
// })

// router.put('/api/todos/:id', (req, res) => {
//     const id = req.params.id;
//     const title = req.body.title;
//     res.json({message: `Opearation has been created with id: ${id} and ${title}`})
// })

// router.delete('/api/todos/:id', (req, res) => {
//     const id = req.params.id;
//     res.json({message: `Request has been deleted ${id}`})
// })


module.exports = router;