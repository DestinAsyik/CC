const Destination =  require('../Models/destination')

// Add new destination
exports.addDestination = async (req, res) => {
    try {
        const { 
            place_name,
            description,
            category,
            city,
            price,
            latitude,
            longitude
        } = req.body;

        // Validasi input
        if (!place_name || !description || !category || !city || !latitude || !longitude) {
            return res.status(400).json({
                status: 'error',
                message: 'Semua field wajib diisi kecuali gambar, rating, dan coordinate'
            });
        }

        // Validasi category
        const validCategories = [
            'Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari',
            'Pusat Perbelanjaan', 'Tempat Ibadah', 'Agrowisata',
            'Belanja', 'Alam', 'Rekreasi', 'Religius'
        ];

        if (!validCategories.includes(category)) {
            return res.status(400).json({
                status: 'error',
                message: 'Kategori tidak valid'
            });
        }


        // Create new destination
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

        res.status(201).json({
            status: 'success',
            message: 'Destination berhasil ditambahkan',
            data: newDestination
        });

    } catch (error) {
        console.error('Error adding destination:', error);
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan saat menambahkan destination',
            error: error.message
        });
    }
}
