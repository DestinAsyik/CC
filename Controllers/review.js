const Review = require('../Models/review')

exports.createReview = async (req, res) => {
    try {
        const { name, rating, review } = req.body;
        const { username } =  req.user.username

        const dataReview = {
            name,
            username,
            rating,
            review
        }
        
        const newReview = await Review.create(dataReview);
        res.status(201).json(newReview);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };