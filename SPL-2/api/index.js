import express from "express";
 import authRoutes from "./Path/auth.js";
 //import userRoutes from "./path/users.js";
 import cookieParser from "cookie-parser";
// import multer from "multer";
import cors from 'cors';



import postROUTE from "./Path/post.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// //const upload = multer({ storage });


app.get('/',(req,res)=>{
    res.send('This is home page');
});
app.use('/p',postROUTE);
app.use('/api',authRoutes);

{/* <script src="https://smtpjs.com/v3/smtp.js">
</script> */}

app.listen(3001,()=>{
    console.log('lisening on port 3001');
});