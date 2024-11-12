const User = require('../Models/user')
const Review = require('../Models/review')
const Destination =  require('../Models/destination')
const axios = require('axios');
const { Op } = require('sequelize');

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

        const reccomResponseContent = await axios.post('http://localhost:8000/recommendations/category', {
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

        const reccomResponseJarak = await axios.post('http://localhost:8000/recommendations/nearby', {
                user_lat: latitude,
                user_long: longitude
        });

        const reccomJarak = reccomResponseJarak.data;

        console.log(reccomJarak)

        const reccomByJarak = await Destination.findAll({
            where: {
                place_name: reccomJarak.nearby_places.map(place => place.place_Name)
            }
        });
        

        res.status(200).json({ message: "Rekomendasi untuk kamu berdasarkan lokasi :", reccomByJarak });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.reccomByReview = async (req, res) => {
    try{
        const user_id = req.user.user_id

        const userReviews = await Review.findAll({where : {
            user_id: user_id
        }});

        const reccomResponseReview = axios.post('http://localhost:8000/reccom', {
            userReviews
        });

        const reccomReview = (await reccomResponseReview).data;

        res.status(201).json({message: "Rekomendasi untuk kamu berdasarkan review kamu :", reccomReview });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.reccomHybrid = async (req, res) => {
    try{
        

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};