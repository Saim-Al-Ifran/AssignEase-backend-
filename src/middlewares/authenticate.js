const jwt = require('jsonwebtoken');
const CustomError = require('../error/CustomError');
const { secretKey } = require('../secret');
const User = require('../model/User');

const authenticate = async(req,_res,next)=>{
    try{
       const authHeader = req.headers.authorization;
     
       let token = req.cookies.jwt || (authHeader && authHeader.split(' ')[1]);
        
        if(!token){
              return next(new CustomError('unauthorized',403));
        }

        const decoded = jwt.verify(token,secretKey);
        const user = await User.findById({_id:decoded.id});
        if(!user){
               return next(new CustomError('unauthorized',401));
        } 
    
        req.user = user;

        next();
     }catch(err){
             
      if (err.name === 'TokenExpiredError') {
        return next(new CustomError('Token expired',401));
      }
  
      if (err.name === 'JsonWebTokenError') {
           return next(new CustomError('Invalid token',401));
      }
      if (err.name === 'SyntaxError') {
         return next(new CustomError('Invalid token',401));
      }
     // console.log(err.message);
      next(new CustomError(err.message,500));

     }
}


module.exports ={
    authenticate
}