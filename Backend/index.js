const multer  = require('multer')
var docxtopdf = require('docx-pdf');
const path= require('path');
const cors=require ('cors')

const express = require('express')
const app = express()
const port = 3000



app.use(cors());
const corsOptions = {
  origin: ['https://convert-app-seven.vercel.app', 'http://localhost:3000'], // Allow requests only from your frontend
  methods: ['GET', 'POST'],       // Specify allowed HTTP methods
  credentials: true,              // Allow cookies if needed
};
app.use(cors(corsOptions));
module.exports = cors(corsOptions);

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live; connect-src 'self' https://vercel.live; img-src 'self' data:;"
  );
  next();
}); 

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

  app.options('/convertfile', cors(corsOptions));

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
