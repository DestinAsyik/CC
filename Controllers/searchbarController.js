const Sequelize = require('sequelize');
const Destination = require('../Models/destination'); 

exports.searchAnything = async (req, res) => {
  const query = req.query.key; 
  const page = parseInt(req.query.page) || 1; 
  const limit = Math.min(parseInt(req.query.limit) || 15, 100); 
  const offset = (page - 1) * limit;  

  if (!query) {
      return res.status(400).json({ message: "Query tidak boleh kosong" });
  }

  if (query.length > 255) {
      return res.status(400).json({ message: "Query terlalu panjang. Maksimal 255 karakter." });
  }

  try {
    const results = await Destination.findAndCountAll({
        where: {
            [Sequelize.Op.or]: [
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('place_name')), 'LIKE', `%${query.toLowerCase()}%`),
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${query.toLowerCase()}%`),
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('category')), 'LIKE', `%${query.toLowerCase()}%`),
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('city')), 'LIKE', `%${query.toLowerCase()}%`),
            ]
        },
        limit: limit,
        offset: offset,
        order: [['rating_avg', 'DESC']] 
    });

      res.status(200).json({
          results: results.rows,
          totalItems: results.count,
          totalPages: Math.ceil(results.count / limit),
          currentPage: page
      });
  } catch (error) {
      console.error('Error during search:', error);
      res.status(500).json({ message: "Terjadi kesalahan saat pencarian", error: error.message });
  }
};