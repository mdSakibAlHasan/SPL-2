import express from "express";
 import authRoutes from "./Path/auth.js";
 //import userRoutes from "./path/users.js";
 import cookieParser from "cookie-parser";
// import multer from "multer";
import cors from 'cors';



import postROUTE from "./Path/post.js"
//const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());


// //const upload = multer({ storage });



// app.use(authRoutes);
// app.use(userRoutes);


// app.listen(3000, () => {
//   console.log("Connected!");
// });


app.use(cors());

// app.use(express.json());
//app.use(express.text());
//app.use(express.static(`${__dirname}/public/`));

app.get('/',(req,res)=>{
    res.send('This is home page');
});
app.use('/p',postROUTE);
app.use('/api',authRoutes);

// app.post('/',(req,res)=>{
//     //console.log(req.body);
//     res.send('This is home page with post request');
// });

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

app.listen(3001,()=>{
    console.log('lisening on port 3000');
});