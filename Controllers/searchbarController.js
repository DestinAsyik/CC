const Sequelize = require('sequelize');
const { Destination } = require('../Models');

const sendResponse = (res, statusCode, status, message, data = null) => {
    return res.status(statusCode).json({ status, message, data });
};

const validateQuery = (query) => {
    if (!query) {
        return 'Query tidak boleh kosong';
    }

    if (query.length > 255) {
        return 'Query terlalu panjang. Maksimal 255 karakter.';
    }

    return null;
};

const buildSearchConditions = (query) => {
    return {
        [Sequelize.Op.or]: [
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('place_name')), 'LIKE', `%${query.toLowerCase()}%`),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${query.toLowerCase()}%`),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('category')), 'LIKE', `%${query.toLowerCase()}%`),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('city')), 'LIKE', `%${query.toLowerCase()}%`)
        ]
    };
};

exports.searchAnything = async (req, res) => {
    const query = req.query.key;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 15, 100); 
    const offset = (page - 1) * limit;

    // Validasi input query
    const validationError = validateQuery(query);
    if (validationError) {
        return sendResponse(res, 400, 'error', validationError);
    }

    try {
        const searchConditions = buildSearchConditions(query);

        const results = await Destination.findAndCountAll({
            where: searchConditions,
            limit: limit,
            offset: offset,
            order: [['rating_avg', 'DESC']] 
        });

        sendResponse(res, 200, 'success', 'Pencarian berhasil', {
            results: results.rows,
            totalItems: results.count,
            totalPages: Math.ceil(results.count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error during search:', error);
        sendResponse(res, 500, 'error', 'Terjadi kesalahan saat pencarian', { error: error.message });
    }
};