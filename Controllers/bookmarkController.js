const Bookmark = require('../Models/bookmark');
const Destination = require('../Models/destination');

exports.addBookmark = async (req, res) => {
    try {
        const { item_id } = req.body;
        const user_id = req.user.user_id;

        const newBookmark = await Bookmark.create({ user_id, item_id });
        res.status(201).json({
            status: 'success',
            message: 'Bookmark berhasil ditambahkan',
            data: newBookmark
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

exports.getBookmarks = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const bookmarks = await Bookmark.findAll({
            where: { user_id },
            include: [Destination],
        });
        res.status(200).json({
            status: 'success',
            message: "Data berhasil didapatkan",
            data: bookmarks
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

exports.deleteBookmark = async (req, res) => {
    try {
        const { bookmark_id } = req.params;
        const user_id = req.user.user_id;
        const bookmark = await Bookmark.findOne({ where: { bookmark_id: bookmark_id, user_id: user_id } });

        if (!bookmark) return res.status(404).json({ message: 'Bookmark tidak ditemukan' });

        await bookmark.destroy();
        res.status(200).json({ message: 'Bookmark berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};