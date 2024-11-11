const Review = require('../Models/review');
const Destination = require('../Models/destination');

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

exports.createReview = async (req, res) => {
    try {
      const  user_id  =  req.user.user_id
      const { rating, review, userLat, userLon } = req.body;
      const { item_id } = req.params;

        const destination = await Destination.findByPk(req.params.item_id);
        if (!destination) {
            return res.status(404).json({ error: 'tidak ada destinasi tersebut' });
        }

        const distance = calculateDistance(userLat, userLon, destination.latitude, destination.longitude);

        const Max = 1; 
        if (distance > Max) {
            return res.status(400).json({ error: 'kamu harus ada di lokasi' });
        }

        const dataReview = {
            item_id,
            user_id,
            rating,
            review
        }
        
        const newReview = await Review.create(dataReview);
        res.status(201).json(newReview);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};