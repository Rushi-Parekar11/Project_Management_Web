const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcryptjs')
const router =  express.Router();
const User = require('../Models/UserModel');
const Project = require('../Models/ProjectModel')
const {signupValidation,loginValidation,projectcreateValidation} = require("../Middleware/AllValidations");

const CLOUD_NAME = "dqw9hj5x6";
const API_KEY = "933327716588469";
const API_SECRET = "ehrMQ09FIBsuJ4M1ZiNjwxYEx5c";

router.get('/',(req,res)=>{
  res.send('server is  running!');
})


router.get('/run',(req,res)=>{
res.send('running !');
})
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


//// Single project.jsx data page 
router.get('/project/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const project = await Project.findOne({ projectname: projectName }).populate('createdby', 'email name').populate('contributor', 'email name');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
    console.log(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to fetch all projects of a specific user by their username
router.get('/:name/dashboard', async (req, res) => {
  const { name } = req.params;

  try {
    const user = await User.findOne({ name }).populate('Projects');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'Projects retrieved successfully',
      projects: user.Projects
    });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


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


//// Single project Documentation
router.get('/documentation/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const project = await Project.findOne({ projectname: projectName }).populate('createdby', 'email name').populate('contributor', 'email name');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
    console.log(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


/// fetch all projects for Global portfolio
router.get('/GlobalPortfolio/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('createdby', 'email name');
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get all projects" });
  }
});



// Add a project to user's Projects array using email
router.post('/project/:projectname', async (req, res) => {
  const { email } = req.body;
  const { projectname } = req.params;

  try {
    const project = await Project.findOne({ projectname });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.Projects.includes(project._id)) {
      user.Projects.push(project._id);
      await user.save();
    }

    if (!project.contributor.includes(user._id)) {
      project.contributor.push(user._id);
      await project.save();
    }
    res.status(200).json({ message: 'Contributor added successfully', user, project });

  } catch (error) {
    console.error('Error adding contributor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//Add textdocs
// Route for adding text data
router.post('/project/:projectname/textdocs', async (req, res) => {
  const { TextDocsObject } = req.body;
  const { projectname } = req.params;

  if (!TextDocsObject) {
    return res.status(400).json({ message: 'TextDocsObject is required' });
  }

  try {
    const project = await Project.findOne({ projectname });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.docText.push(TextDocsObject);
    await project.save();
    res.status(200).json({ message: 'Text data added successfully', project });
  } catch (error) {
    console.error('Error adding text data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to fetch user data with projects for profile and projects by username
router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    const projects = await Project.find({
      $or: [
        { createdby: user._id },
        { contributor: user._id }
      ]
    })
    .populate('createdby', 'name email')
    .populate('contributor', 'name email')
    .populate('saved', 'name email');

    res.status(200).json({
      success: true,
      message: 'User profile fetched successfully',
      user,
      projects,
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});

//fetch images of dokjanImage preset
router.get("/test", async (req, res) => {
  try {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`;

    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    res.status(200).json(data.resources);
  } catch (err) {
    console.error("Cloudinary fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});


// Route upload image of the project on username
router.post('/project/:projectname/docimage', async (req, res) => {
  const { imageUrl, ImageText } = req.body;
  const { projectname } = req.params;

  if (!imageUrl) {
    return res.status(400).json({ message: 'imageUrl is required' });
  }

  try {
    const project = await Project.findOne({ projectname });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.docImage.push({ imageUrl, ImageText });
    await project.save();

    res.status(200).json({ message: 'Image data added successfully', project });
  } catch (error) {
    console.error('Error adding image data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route upload File of the project on username
router.post('/project/:projectname/docfile', async (req, res) => {
  const { imageUrl, ImageText } = req.body;
  const { projectname } = req.params;
  
  if (!imageUrl) {
    return res.status(400).json({ message: 'imageUrl is required' });
  }
  
  try {
    const project = await Project.findOne({ projectname });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
  
    // Push as fileUrl and fileText to match schema
    project.docFile.push({ fileUrl: imageUrl, fileText: ImageText });
    await project.save();
  
    res.status(200).json({ message: 'File data added successfully', project });
  } catch (error) {
    console.error('Error adding file data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
});



module.exports = router