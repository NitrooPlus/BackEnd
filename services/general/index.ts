import {Request,Response,NextFunction,Router} from 'express'
import multer from 'multer'
import path from 'path'

const router=Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(path.resolve('./'),'/public/img'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split(`${'\/'}`)[1])
    }
  })
  const filter = (req:any, file:any, cb:any) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};
const upload=multer({
    storage:storage,
    limits:{
        fieldSize:5*1024*1024
    },
    fileFilter:filter
})

router.post('/upload_image',upload.fields([{name:'image'}]),async(req:Request,res:Response,next:NextFunction)=>{

    const files:any=req.files
    res.status(200).json({url:files?.image?.[0]?.filename})
    
})

router.use((err:any, req:Request, res:Response, next:NextFunction) => {

    if(err.message=='format_error')
    return res.status(500).json({ message:'فرمت فایل اشتباه است' });

    if(err.message=='Unexpected field')
    return res.status(500).json({ message:'فیلد مورد نظر یافت نشد' });

    if(err.message=='File too large')
    return res.status(500).json({ message:'فایل بزرگ از 5 مگابایت است' });

    return res.status(500).json({ message: err.message });
});

export default router