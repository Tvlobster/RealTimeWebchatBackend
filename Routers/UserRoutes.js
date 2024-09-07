const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../Models/User");


const router = new express.Router()


router.post('/users/register',async (req,res)=>{
    let userFromBody = req.body;
    console.log("User Connected to /users/register")
    console.log(req.body)
    try {
        userFromBody.password = await bcrypt.hash(userFromBody.password,8);
         const user = new User(userFromBody);
         let x = await user.save();
         x.password = "";
         res.send({user:x})
    } catch (error){
        res.send({error:error})
    }
})


router.post('/login',async (req,res)=>{

    console.log("User Connected to /login")
    console.log(req.body)
    let username = req.body.username
    let password = req.body.password
    const user = await User.findOne({username:username})
    if(!user){
        res.send({error:"error"})
    } else {
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            req.session.user_id = user._id;
            res.send({id:user.id})
        } else {
            res.send({error:"error"})
        }
    
    }
})


router.get('/find/allUsers',authenticateUser, async (req,res) =>{
    console.log("User Connected to /find/allUsers")
    let users = await User.find({}).exec();
    users.forEach((item)=>{
        item.password = ""
    })
    res.send({users:users})

});



async function authenticateUser(req,res,next){
    console.log(req.session)
    //pulls the session info from the cookie
    //and checks to see if that user is in the db.
    if(!req.session.user_id){
        console.log("Unauthorized user")
        return res.send({error:"Unauthroized user"})
    }
    else{
        try {
            const user = await User.findById(req.session.user_id)
            req.user = user
            next()
        }
        catch(e){
            res.send(e)
        }
        
    }
}



module.exports = router;