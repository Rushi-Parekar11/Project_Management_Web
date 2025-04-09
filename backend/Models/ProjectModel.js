const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['Activities', 'inprocess', 'Complete'],
    default: 'Activities'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProjectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "General",
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  contributor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    } 
  ],
  docText: [
    {
      textname: { type: String, required: true },  
      textnamelogo: String, 
      textContent: String
    }
  ],
  docImage: [
    {
      imageUrl: { type: String, required: true },
      ImageText: String
    }
  ],
  tasks: [taskSchema] 
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
