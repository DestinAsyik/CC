const Bookmark = require('../Models/bookmark');
const Destination = require('../Models/destination');

exports.addBookmark = async (req, res) => {
    try {
        const { item_id } = req.body;
        const user_id = req.user.user_id;

        const newBookmark = await Bookmark.create({ user_id, item_id });
        res.status(201).json({ message: 'Bookmark ditambahkan', newBookmark });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookmarks = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const bookmarks = await Bookmark.findAll({
            where: { user_id },
            include: [Destination],
        });
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBookmark = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.user_id;
        const bookmark = await Bookmark.findOne({ where: { bookmark_id: id, user_id } });

        if (!bookmark) return res.status(404).json({ message: 'Bookmark tidak ditemukan' });

        await bookmark.destroy();
        res.status(200).json({ message: 'Bookmark dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};