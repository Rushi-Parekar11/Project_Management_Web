const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router =  express.Router();
const User = require('../Models/UserModel');
const Project = require('../Models/ProjectModel')
const {signupValidation,loginValidation,projectcreateValidation} = require("../Middleware/AllValidations");

router.post('/signup', signupValidation,async(req,res)=>{
    try {
       const {name,email,password} = req.body;
       const user = await UserModel.findOne({email});
       if(user){
        return res.status(409).json({message : 'user is Already exist,you can Login',success:false})
       }
       const userModel = new UserModel({name,email,password});
       userModel.password = await bcrypt.hash(password, 10);
       await userModel.save();
       res.status(201)
       .json({
        message:'Signup Successfully',
        success:true
       })
    } catch (error) {
      res.status(500)
      .json({
        message:'Internal Server error (Allroute.js)',
        success:false
       })
    }
})

router.post('/login',loginValidation,async(req,res)=>{
   try {
     const {email,password} = req.body;
     const user = await UserModel.findOne({email});
     if(!user){
      return res.status(403).json({message : 'email or Password is wrong',success:false})
     }
     const isPassEqual = await bcrypt.compare(password,user.password)
     if(!isPassEqual){
       return res.status(403)
       .json({message:"email or password is wrong",success:false});
     }
     const jwtToken = jwt.sign(
       {email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
     )
     res.status(200)
     .json({
      message:'login Successfully',
      success:true,
      jwtToken,
      email,
      name:user.name
     })
  } catch (error) {
    res.status(500)
    .json({
      message:'Internal Server error [Allroute.js]',
      success:false
     })
  }
 })


 router.post('/:name/dashboard', async (req, res) => {
  try {
    const { projectname, discription, type } = req.body;
    const { name } = req.params;

    // const user = await User.findOne({ name }); // Now both match
    const user = await User.findOne({ username: name });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newProject = new Project({
      projectname,
      discription,
      type,
      createdby: user._id
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      message: 'Project created successfully',
      project: savedProject
    });

  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).json({ message: 'Server error while creating project' });
  }
});




module.exports = router