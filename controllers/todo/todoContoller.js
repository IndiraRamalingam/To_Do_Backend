const User = require('../../models/user');
const ToDo = require('../../models/todo');
const jwt = require("jsonwebtoken");
const config=require('../../utils/config');
const randomstring=require('randomstring');

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

}

module.exports=todoContoller;