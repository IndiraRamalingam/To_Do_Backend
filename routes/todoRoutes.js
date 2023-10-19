const express=require('express')
const router=express.Router();
const todoController = require('../controllers/todo/todoContoller')

//to get the ID of User
router.get('/getId',todoController.getUserID);

module.exports=router;