const { Destination, Bookmark } = require('../Models');

const handleError = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({ error: message });
};

exports.toggleBookmark = async (req, res) => {
    try {
        const { item_id } = req.body;
        const user_id = req.user.user_id;

        if (!item_id) {
            return handleError(res, "item_id tidak ditemukan di request body", 400);
        }

        const existingBookmark = await Bookmark.findOne({ where: { user_id, item_id } });

        if (existingBookmark) {
            await existingBookmark.destroy();
            return res.status(200).json({ isBookmarked : false, message: 'Bookmark berhasil dihapus' });
        } else {
            const newBookmark = await Bookmark.create({ user_id, item_id });
            return res.status(201).json({ message: 'Bookmark berhasil ditambahkan', isBookmarked : true, newBookmark });
        }
    } catch (error) {
        console.error(error);
        return handleError(res, error.message);
    }
};

exports.getBookmarks = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const bookmarks = await Bookmark.findAll({
            where: { user_id },
            include: [Destination],
        });
        res.status(200).json({ message: "Data berhasil diambil", bookmarks });
    } catch (error) {
        console.error(error);
        return handleError(res, "Terjadi kesalahan saat mengambil data bookmark.");
    }
};