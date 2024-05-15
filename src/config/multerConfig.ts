// src/config/multerConfig.ts
import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/')  // Ensure this directory exists
    },
    filename: function(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        //cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
