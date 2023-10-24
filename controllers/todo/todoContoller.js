const User = require('../../models/user');
const todoItemsModel = require('../../models/todo');
const jwt = require("jsonwebtoken");
const config=require('../../utils/config');

const SECRET_KEY = config.SECRET_KEY;

const getTokenFrom = (request) => {
    const authHeader = request.header('Authorization');
    return authHeader;
}

const todoContoller={
    
      //To get the ID of User
      getUserID:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const user=await User.findById(decodedToken.userId).exec();
            const user_ID=user._id
            res.status(200).json({user_ID,user})
            
        }
        catch(error){
            console.error('Error in Fetching User ID',error)
            res.status(500).json({message:'Error in Fetching User ID'})
        }
    },

    //To view all tasks
    getAllTasks:async(req,res)=>{
        try{
            const allTodoItems = await todoItemsModel.find({user:req.params.id});
            // console.log(allTodoItems);
            res.status(200).json(allTodoItems)
          }catch(err){
            res.json(err);
          }
    },

    //To get Task using ID
    getTask:async(req,res)=>{
      try{
          //console.log(req.params.id)
          const TodoItems = await todoItemsModel.findById(req.params.id).exec();
          //console.log({TodoItems});
          res.status(200).json({TodoItems})
        }catch(err){
          res.json(err);
        }
  },

     //To add new task
     addnewTask:async(req,res)=>{
        try{
            const {task}=req.body;
            //console.log("TASK "+task+"   "+ req.params.id)
            const newItem = new todoItemsModel({
              task: task,
              status:'Pending',
              user:req.params.id,
            })
            //save this item in database
            const saveItem = await newItem.save();
            // console.log(saveItem)
            res.status(200).json(saveItem);
          }catch(err){
            res.json(err);
          }
    },

    //To update Status
    editStatus:async(req,res)=>{
      try{
        
            //find the item by its id and update it
            const updateStatus = await todoItemsModel.findByIdAndUpdate(req.params.id).exec();
            updateStatus.set({status:'Completed'})
            const result=await updateStatus.save();
            //console.log(result)
            res.status(200).json({result});
          }catch(err){
            res.json(err);
          }
    },

     //To update a task
     editTask:async(req,res)=>{
        try{
            //find the item by its id and update it
            const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id).exec();
            updateItem.set(req.body)
            const result=await updateItem.save();
            res.status(200).json({result});
          }catch(err){
            res.json(err);
          }
    },

     //To Delete a task
     deleteTask:async(req,res)=>{
        try{
          //console.log(req.params.id)
            //find the item by its id and delete it
            const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
            // console.log("DELETED");
            res.status(200).json('Item Deleted');
          }catch(err){
            res.json(err);
          }
    },

}

module.exports=todoContoller;