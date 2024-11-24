const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Format file tidak didukung. Gunakan format: jpeg, jpg, png, atau webp'), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 30 * 1024 * 1024 // 30MB in bytes
    }
});

exports.uploadImage = async (req, res, next) => {
    try {
        // Single upload handling
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error("Upload Error:", err.message);

                if (err instanceof multer.MulterError) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            status: false,
                            message: "Ukuran file terlalu besar. Maksimal 30MB"
                        });
                    }
                    return res.status(400).json({
                        status: false,
                        message: "Error pada upload file",
                        error: err.message
                    });
                }

                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    status: false,
                    message: "Tidak ada file yang diupload"
                });
            }

            // Add file info to request
            req.uploadedFile = {
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype
            };

            console.log("File uploaded successfully:", req.uploadedFile);
            next();
        });
    } catch (error) {
        console.error("Upload Error:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};