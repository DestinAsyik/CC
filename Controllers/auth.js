const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const Sequelize = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { username, name, password, age, email, city, prefered_category } = req.body;

    if (!username || !name || !password || !age || !email || !city || !prefered_category) {
      console.log('Field kosong ditemukan');
      return res.status(400).send({ message: 'Semua field harus diisi.' });
    }
    
    // Periksa apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`Email sudah terdaftar: ${email}`);
      return res.status(400).send({ message: 'Email sudah terdaftar. Silakan gunakan email lain.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      password: hashedPassword,
      age,
      email,
      city,
      prefered_category,
    });

    res.status(201).send({ message: 'Pengguna berhasil terdaftar', user });
  } catch (error) {
    res.status(500).send(error.message);
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

    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    res.status(200).send({ message: "Login berhasil", user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getDataUser = async (req, res) => {
  const Username = req.user.username;

  try {
    const user = await User.findByPk(Username);

    if (!user) {
      return res.status(404).json({ error: 'Data pengguna tidak ditemukan.' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, name, age, email, city, prefered_category } = req.body;
    const Username = req.user.email;

    const updatedData = {
      username, 
      name, 
      age, 
      email, 
      city, 
      prefered_category
    };

    // Update informasi profil pengguna
    const updatedDataUser = await User.update(
      updatedData,
      { where: { username: Username } } 
    );

    if (updatedDataUser[0] === 0) {
      return res.status(404).send({ message: "Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan" });
    }

    res.status(200).send({ message: "Profil berhasil di ubah" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logout = async (req, res) => {

  res.clearCookie('token'); 
  res.status(200).json({ message: 'Logout berhasil' });
  
};