import express from "express";
 import authRoutes from "./Path/auth.js";
 import profileRoute from "./profile/path.js";
 import RDroute from "./Path/RD.js";

 //import userRoutes from "./path/users.js";
 import cookieParser from "cookie-parser";
 import bodyParser from "body-parser";
// import multer from "multer";
import cors from 'cors';



import postROUTE from "./Path/RD.js"

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

// //const upload = multer({ storage });


app.get('/',(req,res)=>{
    res.send('This is home page');
});
app.use('/p',postROUTE);
app.use('/api',authRoutes);
app.use('/app',profileRoute);
app.use('/RD',RDroute);


{/* <script src="https://smtpjs.com/v3/smtp.js">
</script> */}

app.listen(3001,()=>{
    console.log('lisening on port 3001');
});