const User = require("../models/userModel")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



exports.registerExpress = async (req, res) => {
    try {


        let getUser = await User.findOne({
            email: req.body.email
        });
        if(getUser){
            return res.status(400).json({
                code:400,
                message:"Invalid",
                body:{}
            })
        }
        // decrypt the password
        req.body.password= await bcrypt.hash(req.body.password, 10);

        let response = await User.create(req.body);
        return res.status(200).json({
            code:200,
            message:"Sucess",
            body:response
        })
    } catch (err) {
        console.log("am error", err)
    }
    
}

exports.login = async(req,res)=>{
    try{
        let{email, password} = req.body
        // get email address
        let getUserDetail = await User.findOne({
            email
        })
        if(!getUserDetail){
            return res.status(404).json({
                status:404,
                message:"Email does't exit's"
            })
        }
     

        // checking for passwords
        let vaidatePassword = await bcrypt.compare(password, getUserDetail.password)
  
        if(!vaidatePassword){
            return res.status(400).json({
                status:404,
                message:"Invalid  password"
            })
        }
        let payload = {
            email:getUserDetail.email,
            id:getUserDetail._id
        }
        let jwtsecret = process.env.JWT_SECRET_KEY;

        var token = jwt.sign(payload, jwtsecret,{
            expiresIn: '5h'
        });
        
        return res.status(200).json({
            status:200,
            message:"Login Sucess",
            data:{
                getUserDetail,
                token
            }
        })

        

    }catch(err){
        console.log(err)
    }
}

exports.verifyToken = async(token)=>{
    try{
        let jwtsecret = process.env.JWT_SECRET_KEY;
       let response =  jwt.verify(token,jwtsecret)
       if(response){
           return response
       }else{
      return false
       }
    }catch(err){
        return false
    }

}