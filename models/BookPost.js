const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    img: {
      type: String,
    },
    status: {
      default:'1',
      type: String,
    },
    statuscount: {
      type: Array,
      default: [],
    },
    city :{
      type: String,
      default:''
    },
    name :{
      type: String,
      default:''
    },
    kitaptur :{
      type: String,
      required: true,
      default:'Roman'
    },
    /*status: {
    type: String,
    required: true,
     },
      location: {
      type: String,
      required: true,
      },*/
    likes: {
      type: Array,
      default: [],
    },
    bookmark: {
      type: Array,
      default: [],
    },
    confirm :{
      type: String,
      default:'0'
    },
    tarih:{
      type: Date,
      default: Date.now(),
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookPost", PostSchema);