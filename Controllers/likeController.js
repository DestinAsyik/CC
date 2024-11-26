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
            return res.status(200).json({
                status: 'success',
                message: 'Like berhasil dihapus',
                data: { isLiked: false }
            });
        } else {
            // Jika belum ada, tambahkan like
            const newLike = await Likes.create({ user_id, item_id });
            return res.status(201).json({
                status: 'success',
                message: 'Like berhasil ditambahkan',
                data: { isLiked: true, like: newLike }
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

// exports.toggleLikes = async (req, res) => {
//     try {
//         const items = req.body; 
//         const user_id = req.user.user_id;
//         const results = [];

//         for (const item of items) {
//             const { item_id } = item;

//             // Cari like yang sesuai
//             const existingLike = await Likes.findOne({ where: { user_id, item_id } });

//             if (existingLike) {
//                 // Jika sudah ada, hapus like
//                 await existingLike.destroy();
//                 results.push({ item_id, message: 'Like berhasil dihapus', isLiked: false });
//             } else {
//                 // Jika belum ada, tambahkan like
//                 const newLike = await Likes.create({ user_id, item_id });
//                 results.push({ item_id, message: 'Like ditambahkan', isLiked: true });
//             }
//         }

//         res.status(201).json(results);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
