const { Destination, Review, User } = require('../Models');

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

exports.createReviews = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { rating, review, userLat, userLon } = req.body;
    const { item_id } = req.params;

    const destination = await Destination.findByPk(item_id);
    if (!destination) {
      return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
    }

    const existingReview = await Review.findOne({ where: { user_id, item_id } });
    if (existingReview) {
      return res.status(400).json({ error: 'Kamu sudah memberikan review untuk destinasi ini' });
    }

    const distance = calculateDistance(userLat, userLon, destination.latitude, destination.longitude);
    const Max = 1; 
    if (distance > Max) {
      return res.status(400).json({ error: 'Kamu harus berada di lokasi untuk memberi review' });
    }

    const dataReview = {
      item_id,
      user_id,
      rating,
      review
    };
    const newReview = await Review.create(dataReview);

    const newRatingCount = (destination.rating_count || 0) + 1;
    const newRatingAvg = ((destination.rating_avg || 0) * (destination.rating_count || 0) + rating) / newRatingCount;
    
    await destination.update({
      rating_avg: newRatingAvg,
      rating_count: newRatingCount
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { item_id } = req.params;

    const reviews = await Review.findAll({
      where: { item_id },
      include: [
        {
          model: User, 
          attributes: ['username'] 
        }
      ]
    });

    if (!reviews.length) {
      return res.status(404).json({ error: 'Tidak ada review untuk destinasi ini' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};