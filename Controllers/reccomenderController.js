const { User, Review, Bookmark, Likes, Destination } = require('../Models')
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
    try {
        const { latitude, longitude } = req.body;

        // Memanggil endpoint ML untuk rekomendasi berdasarkan lokasi
        const reccomResponseJarak = await axios.post(`${BASE_URL}recommendations/nearby`, {
            user_lat: latitude,
            user_long: longitude
        });

        const reccomJarak = reccomResponseJarak.data;
        console.log(reccomJarak);

        // Mendapatkan nama tempat dan distance_km dari respons
        const nearbyPlaces = reccomJarak.nearby_places.map((place) => ({
            place_name: place.place_name,
            distance_km: place.distance_km
        }));

        // Mencari destinasi berdasarkan nama tempat yang direkomendasikan
        const reccomByJarak = await Destination.findAll({
            where: {
                place_name: {
                    [Op.in]: nearbyPlaces.map((place) => place.place_name),
                },
            },
        });

        // Menambahkan distance_km ke setiap destinasi yang ditemukan
        const resultWithDistance = reccomByJarak.map((destination) => {
            const matchedPlace = nearbyPlaces.find((place) => place.place_name === destination.place_name);
            return {
                ...destination.toJSON(),
                distance_km: matchedPlace ? matchedPlace.distance_km : null,
            };
        });

        // Mengirim respons ke client
        res.status(200).json({ 
            message: "Rekomendasi untuk kamu berdasarkan lokasi :", 
            data: resultWithDistance 
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.reccomHybrid = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        // Ambil data review, bookmark, dan likes pengguna
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

        // Validasi dan format data yang akan dikirim ke FastAPI
        const hybridData = {
            user_id: user_id, 
            review_data: userReviews.map(review => ({
                user_id: user_id, 
                item_id: review.item_id,
                rating: review.rating
            })),
            bookmarks: userBookmarks.map(bookmark => bookmark.item_id), 
            likes: userLikes.map(like => like.item_id) 
        };

        console.log(hybridData)

        const reccomResponse = await axios.post(`${BASE_URL}recommendations/collaborative`, hybridData);
        const recommendedItemIds = reccomResponse.data.collaborative_recommendations;

        console.log(recommendedItemIds)

        const recommendedItems = await Destination.findAll({
            where: {
                item_id: {
                    [Op.in]: recommendedItemIds 
                }
            }
        });

        res.status(200).json({
            message: "Rekomendasi untuk kamu berdasarkan aktivitasmu:",
            recommendations: recommendedItems 
        });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};