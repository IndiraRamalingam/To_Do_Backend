const express=require('express')
const router=express.Router();
const todoController = require('../controllers/todo/todoContoller')

//to get the ID of User
router.get('/getId',todoController.getUserID);

//to view all tasks
router.get('/getAll/:id',todoController.getAllTasks);

//to get task using ID
router.get('/getTask/:id',todoController.getTask);

//to add new task
router.post('/addTask/:id',todoController.addnewTask);

//to update status
router.put('/editStatus/:id',todoController.editStatus);

//to update task
router.put('/editTask/:id',todoController.editTask);

//to delete task
router.delete('/deleteTask/:id',todoController.deleteTask);

module.exports=router;