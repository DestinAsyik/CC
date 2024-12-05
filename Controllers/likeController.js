const { Likes, Destination } = require('../Models');

const sendResponse = (res, statusCode, status, message, data = null) => {
    return res.status(statusCode).json({ status, message, data });
};

const validateLikeInput = async (user_id, item_id) => {
    const item = await Destination.findByPk(item_id); 
    if (!item) {
        return 'Item tidak ditemukan';
    }

    if (!user_id) {
        return 'User tidak valid';
    }

    return null;
};

exports.toggleLike = async (req, res) => {
    try {
        const { item_id } = req.body;
        const user_id = req.user.user_id;

        // Validasi inputan
        const validationError = await validateLikeInput(user_id, item_id);
        if (validationError) {
            return sendResponse(res, 400, 'error', validationError);
        }

        // Cari like yang sudah ada
        const existingLike = await Likes.findOne({ where: { user_id, item_id } });

        if (existingLike) {
            // Jika sudah ada, hapus like
            await existingLike.destroy();
            return sendResponse(res, 200, 'success', 'Likes berhasil dihapus', { isLiked: false });
        } else {
            // Jika belum ada, tambahkan like
            const newLike = await Likes.create({ user_id, item_id });
            return sendResponse(res, 201, 'success', 'Likes ditambahkan', { isLiked: true, newLike });
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        sendResponse(res, 500, 'error', 'Terjadi kesalahan pada server', { error: error.message });
    }
};