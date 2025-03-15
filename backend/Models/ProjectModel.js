const mongoose = require('mongoose');

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
    enum: ["General", "Software", "Marketing", "Research", "Other"]
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
