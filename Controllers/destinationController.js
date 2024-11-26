const { Destination } = require('../Models');

const sendResponse = (res, statusCode, status, message, data = null) => {
    return res.status(statusCode).json({ status, message, data });
};

const validateDestinationInput = ({ place_name, description, category, city, latitude, longitude }) => {
    if (!place_name || !description || !category || !city || !latitude || !longitude) {
        return 'Semua field wajib diisi kecuali gambar, rating, dan coordinate';
    }

    const validCategories = [
        'Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari',
        'Pusat Perbelanjaan', 'Tempat Ibadah', 'Agrowisata',
        'Belanja', 'Alam', 'Rekreasi', 'Religius'
    ];
    if (!validCategories.includes(category)) {
        return 'Kategori tidak valid';
    }

    return null; 
};

exports.addDestination = async (req, res) => {
    try {
        const { place_name, description, category, city, price, latitude, longitude } = req.body;

        const validationError = validateDestinationInput({ place_name, description, category, city, latitude, longitude });
        if (validationError) {
            return sendResponse(res, 400, 'error', validationError);
        }

        const newDestination = await Destination.create({
            place_name,
            description,
            gambar: req.file.gcsUrl,
            category,
            city,
            price: price || 0,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            rating_avg: null,
            rating_count: 0
        });

        sendResponse(res, 201, 'success', 'Destination berhasil ditambahkan', newDestination);
    } catch (error) {
        console.error('Error adding destination:', error);
        sendResponse(res, 500, 'error', 'Terjadi kesalahan saat menambahkan destination', { error: error.message });
    }
};