const { Storage } = require('@google-cloud/storage');
const multer = require('multer');

// Konfigurasi Google Cloud Storage
const storage = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, 
    projectId: 'destinasyik',
});

// bucket tempat menyimpan file
const bucket = storage.bucket('destinasyikfile');

// Middleware Multer untuk menangani upload
const multerStorage = multer.memoryStorage();
const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 30 * 1024 * 1024 },  // Max size 30MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('File type not allowed. Only JPEG, PNG are allowed.');
            error.status = 400;
            return cb(error, false);
        }
        cb(null, true);
    },
});

// Middleware untuk mengunggah file ke GCS
const uploadToGCS = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,  
        
    });

    blobStream.on('error', (err) => {
        console.error('Error uploading to GCS:', err);
        return res.status(500).json({ message: 'Error uploading image to cloud storage', error: err.message });
    });

    blobStream.on('finish', () => {
        req.file.gcsUrl = `https://storage.googleapis.com/${bucket.name}/image/${fileName}`;  
        next();
    });

    blobStream.end(req.file.buffer);
};

module.exports = {
    upload: upload.single('image'),  
    uploadToGCS,  
};