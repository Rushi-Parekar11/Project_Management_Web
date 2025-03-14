const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    Projects: [
        {
          menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Projects",
          },
          Created: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
          },
          contributors: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
          },
        },
      ],
    
    
},
{timestamps : true}
)

const User = mongoose.model("User", UserSchema);
module.exports = User;