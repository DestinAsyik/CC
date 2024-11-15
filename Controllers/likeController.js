const Likes = require('../Models/likes');

exports.toggleLike = async (req, res) => {
    try {
        const { item_id } = req.body;
        const user_id = req.user.user_id;

        // Cari like yang sesuai
        const existingLike = await Likes.findOne({ where: { user_id, item_id } });

        if (existingLike) {
            // Jika sudah ada, hapus like
            await existingLike.destroy();
            return res.status(200).json({ message: 'Likes berhasil dihapus', isLiked: false });
        } else {
            // Jika belum ada, tambahkan like
            const newLike = await Likes.create({ user_id, item_id });
            return res.status(201).json({ message: 'Likes ditambahkan', isLiked: true, newLike });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};