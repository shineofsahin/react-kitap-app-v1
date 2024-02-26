const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const  multer = require('multer')
const router = express.Router();
const path = require("path");
// dotenv
require('dotenv').config({
    path: './config/config.env'
})


const app = express()

app.use("/images", express.static(path.join(__dirname, "public/images")));

// DB bağlantisi
connectDB(); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("Dosya yüklemesi basarili");
  } catch (error) {
    console.error(error);
  }
});
app.use(bodyParser.json())

//const authRouter = require('./routes/auth.route')
//const userRouter = require('./routes/user.route')
//const postRouter = require("./routes/post") 
//const chatRouter = require('./routes/Chat')
//const messagesRouter = require("./routes/messages") 
/*
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}
*/
app.use(cors({
    origin: process.env.CLIENT_URL
}));   
app.use(express.json());

//app.use('/api', authRouter)
//app.use('/api', userRouter)
//app.use("/api/post", postRouter)
//app.use("/api/chat", chatRouter)
//app.use("/api/messages", messagesRouter)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Sayfa bulunamadı..."
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Bu portta çalışıyor :  ${PORT}`);
});