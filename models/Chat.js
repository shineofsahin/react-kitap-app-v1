const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    members:{
        type: Array,
    },
    text:{
      type: String,
      default:"",
  },
  updatedAt:{
    type: Date,
    default: Date.now(),
},
  lastmessagesender:{
    type: String,
    default:"",
},
 last:{
    type: String,
    default:"0",
},
deletelist:{
  type: Array,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema); 