const multer  = require('multer')
var docxtopdf = require('docx-pdf');
const path= require('path');
const cors=require ('cors')

const express = require('express')
const app = express()
const port = 3000



app.use(cors());
const corsOptions = {
  origin: 'https://convert-app-yjk9.vercel.app/', // Allow requests only from your frontend
  methods: ['GET', 'POST'],       // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
  credentials: true,              // Allow cookies if needed
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/convertfile', upload.single('file'), (req, res, next)=> {
    try{
        if  (!req.file){
            return res.status(400).json({
                message:"no file uploaded"
            });
        }
        let outputpath=path.join(__dirname,"files",`${req.file.originalname}.pdf`)
        docxtopdf(req.file.path,outputpath,(err,result)=>{
            if(err){
              console.log(err);
            }
            res.download(outputpath,()=>{
                console.log("file downloaded")
            })
          });    
    }
    catch(error){
        console.log(error)
    }
  })

app.listen(port, () => {
  console.log(`Server is showing on port ${port}`)
})
