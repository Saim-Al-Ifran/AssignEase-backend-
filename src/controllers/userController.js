const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require("../secret");
const CustomError = require("../error/CustomError");

 

const registerController = async(req,res)=>{
    try {
        const { name, email, password, avatar } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
          name,
          email,
          password:hashedPassword,
          avatar
        });
 
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}

 
const loginController = async(req,res,next)=>{
      const{email,password} = req.body
   
    try {
           const user = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });
                    
           if(!user){
                 return next(new CustomError('Unauthorized',403))
           }
 
           const isMatch = await bcrypt.compare(password,user.password);

           if(!isMatch){
              return next(new CustomError('Invalid Credential',403));
               
           }
   
           const payload = {
               id:user.id,
               name:user.name,
               email:user.email,
           }

          
   
           const token = jwt.sign(payload,secretKey,{expiresIn:'1hr'});
           res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
           if(!token){
                return next(new CustomError('Failed to generate token'));
           }
   
           return res.status(202).json({
            user:{
              name:user.name,
              email:user.email
            },
            message:'Login Successfull',
            token
          });

    } catch (err) {
          next(new CustomError(err.message,500));
    }
}


module.exports = {
    registerController,
    loginController
}