const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const Sequelize = require('sequelize');
const moment = require('moment');

exports.register = async (req, res) => {
  try {
    const { username, name, password, date_birth, email, city, prefered_category } = req.body;

    if (!username || !name || !password || !date_birth || !email || !city || !prefered_category) {
      console.log('Field kosong ditemukan');
      return res.status(400).json({
        status: 'error',
        message: 'Semua field harus diisi.'
      });
    }
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`Email sudah terdaftar: ${email}`);
      return res.status(400).json({
        status: 'error',
        message: 'Email sudah terdaftar. Silakan gunakan email lain.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      password: hashedPassword,
      date_birth,
      email,
      city,
      prefered_category,
    });
    const data = {
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      email: user.email,
      age: moment().diff(moment(user.date_birth), 'years'),
      city: user.city,
      prefered_category: user.prefered_category,
    };

    res.status(201).json({
      status: 'success',
      message: 'Pengguna berhasil terdaftar',
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).send({ message: "Diperlukan nama pengguna atau email" });
    }

    const whereCondition = {};
    if (username) {
      whereCondition[Sequelize.Op.or] = [{ username: username }];
    } else {
      whereCondition[Sequelize.Op.or] = [{ email: email }];
    }

    const user = await User.findOne({
      where: whereCondition
    }).catch(error => {
      return res.status(500).send({ message: "Server sedang gangguan", error: error.message });
    });

    if (!user) {
      return res.status(404).send({ message: "Pengguna tidak di temukan" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ message: "Kata sandi salah" });
    }

    const token = jwt.sign({ user_id:user.user_id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        token,
        user: {
          user_id: user.user_id,
          username: user.username
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

exports.getDataUser = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'Data pengguna tidak ditemukan.' });
    }
    
    const data = {
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      email: user.email,
      age: moment().diff(moment(user.date_birth), 'years'),
      city: user.city,
      prefered_category: user.prefered_category,
    };

    res.status(200).json({
      status: 'success',
      message: 'Data pengguna berhasil diambil',
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, name, date_birth, email, city, prefered_category } = req.body;
    const Username = req.user.username;

    const data = {
      username, 
      name,
      date_birth,
      email, 
      city, 
      prefered_category,
      tanggal_lahir,
    };

    // Update informasi profil pengguna
    const updatedDataUser = await User.update(
      updatedData,
      { where: { username: Username } } 
    );

    if (updatedDataUser[0] === 0) {
      return res.status(404).send({ message: "Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan" });
    }

    res.status(200).json({
      status: 'success',
      message: 'Profil berhasil diubah',
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

exports.logout = async (req, res) => {

  res.clearCookie('token'); 
  res.status(200).json({
    status: 'success',
    message: 'Logout berhasil',
    data: null
  });
  
};
