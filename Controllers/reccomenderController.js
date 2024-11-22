const User = require('../Models/user')
const Review = require('../Models/review')
const Bookmark =  require('../Models/bookmark')
const Destination =  require('../Models/destination')
const axios = require('axios');
const { Op } = require('sequelize');
const BASE_URL = process.env.MODEL_BASE_URL || 'http://localhost:8000/';

exports.reccomByContent = async (req, res) => {
    try{
        const user_id = req.user.user_id;

        const content = await User.findByPk(user_id, {
            attributes: ['prefered_category']
        });

        if (!content) {
            return res.status(404).json({ message: 'Anda belum login' });
        }

        const preferredCategory = content.prefered_category;

        const reccomResponseContent = await axios.post(`${BASE_URL}recommendations/category`, {
            category: preferredCategory
        });

        const reccomContent = reccomResponseContent.data;
        const reccomContentList = reccomContent.reccomContent;
        console.log("Recommended places:", reccomContentList);

        const reccomByContent = await Destination.findAll({
            where : {
                place_name : {
                    [Op.in]: reccomContentList  
                }
            }
        });

        res.status(200).json({ message: "rekomendasi untuk kamu : ", reccomByContent, preferredCategory });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.reccomByJarak = async (req, res) => {
    try{
        const { latitude, longitude } = req.body

        const reccomResponseJarak = await axios.post(`${BASE_URL}recommendations/nearby`, {
                user_lat: latitude,
                user_long: longitude
        });

        const reccomJarak = reccomResponseJarak.data;
        console.log(reccomJarak)
        const placeNames = reccomJarak.nearby_places.map((place) => place.place_name);

        const reccomByJarak = await Destination.findAll({
            where: {
                place_name: {
                    [Op.in]: placeNames, 
                },
            },
        });
        

        res.status(200).json({ message: "Rekomendasi untuk kamu berdasarkan lokasi :", reccomByJarak });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.reccomHybrid = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const userReviews = await Review.findAll({
            where: { user_id },
            attributes: ['item_id', 'rating']
        });

        const userBookmarks = await Bookmark.findAll({
            where: { user_id },
            attributes: ['item_id']
        });

        const userLikes = await Likes.findAll({
            where: { user_id },
            attributes: ['item_id']
        });

        //validasi untuk kirim data yang di butuhkan
        const hybridData = {
            reviews: userReviews.map(review => ({
                item_id: review.item_id,
                rating: review.rating,
            })),
            bookmarks: userBookmarks.map(bookmark => ({
                item_id: bookmark.item_id,
            })),
            likes: userLikes.map(like => ({
                item_id: like.item_id,
            }))
        };

        const reccomResponse = await axios.post(`${BASE_URL}recommendations/hybrid`, hybridData);

        res.status(201).json({
            message: "Rekomendasi untuk kamu berdasarkan aktivitasmu:",
            recommendations: reccomResponse.data
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};