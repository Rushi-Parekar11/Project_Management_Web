const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router =  express.Router();
const User = require('../Models/UserModel');
const Project = require('../Models/ProjectModel')
const {signupValidation,loginValidation,projectcreateValidation} = require("../Middleware/AllValidations");

//// signup route 
router.post('/signup', signupValidation,async(req,res)=>{
    try {
       const {name,email,password} = req.body;
       const user = await User.findOne({email});
       if(user){
        return res.status(409).json({message : 'user is Already exist,you can Login',success:false})
       }
       const userModel = new User({name,email,password});
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

//// login route 
router.post('/login', loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login Successfully',
      success: true,
      jwtToken,
      email,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server error [Allroute.js]',
      success: false
    });
  }
});


//// Project create route
 router.post('/:name/dashboard', projectcreateValidation, async (req, res) => {
  const { projectname, discription, type } = req.body;
  const { name } = req.params;

  try {
    const user = await User.findOne({ name });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const newProject = new Project({
      projectname,
      discription,
      type,
      createdby: user._id
    });

    // Save the project first
    const savedProject = await newProject.save();

    // Then update the user's Projects
    user.Projects.push(savedProject._id);
    await user.save();

    res.status(201).json({
      message: 'Project created successfully',
      project: savedProject
    });
  } catch (error) {
    console.error(" Error creating project:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


//// Single project data page 
router.get('/project/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const project = await Project.findOne({ projectname: projectName }).populate('createdby', 'email name');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
    console.log(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//// Task CURD
// PUT route to update tasks of a specific project
router.put('/project/:projectname', async (req, res) => {
  const { projectname } = req.params;
  const { tasks } = req.body;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { projectname },
      { tasks },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error("Error updating tasks:", err);
    res.status(500).json({ message: 'Server error while updating tasks' });
  }
});


// Route to fetch all projects of a specific user by their username
router.get('/:name/dashboard', async (req, res) => {
  const { name } = req.params;

  try {
    // Find the user by their name
    const user = await User.findOne({ name }).populate('Projects');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user exists, return their projects
    res.status(200).json({
      message: 'Projects retrieved successfully',
      projects: user.Projects
    });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router