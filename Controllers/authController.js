const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../Models');
const Sequelize = require('sequelize');
require('dotenv').config();

const validateRequestBody = (requiredFields, body) => {
  for (let field of requiredFields) {
    if (!body[field]) {
      return { success: false, message: `Field ${field} harus diisi.` };
    }
  }
  return { success: true };
};

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

exports.register = async (req, res) => {
  try {
    const { username, name, password, tanggal_lahir, email, city, prefered_category } = req.body;
    
    const validation = validateRequestBody(['username', 
                                            'name', 
                                            'password', 
                                            'tanggal_lahir', 
                                            'email', 
                                            'city', 
                                            'prefered_category'], req.body);
    if (!validation.success) {
      return sendErrorResponse(res, 400, validation.message);
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendErrorResponse(res, 400, 'Email sudah terdaftar. Silakan gunakan email lain.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, 
                                     name, 
                                     password: hashedPassword, 
                                     tanggal_lahir, 
                                     email, 
                                     city, 
                                     prefered_category });

    res.status(201).json({ message: 'Pengguna berhasil terdaftar', user });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Terjadi kesalahan saat mendaftar pengguna.');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return sendErrorResponse(res, 400, 'Diperlukan nama pengguna atau email');
    }

    const whereCondition = {};
    if (username) whereCondition[Sequelize.Op.or] = [{ username }];
    else whereCondition[Sequelize.Op.or] = [{ email }];
    
    const user = await User.findOne({ where: whereCondition });
    if (!user) return sendErrorResponse(res, 404, 'Pengguna tidak ditemukan');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendErrorResponse(res, 401, 'Kata sandi salah');

    const token = jwt.sign({ user_id: user.user_id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login berhasil', user, token });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Terjadi kesalahan saat login.');
  }
};

exports.getDataUser = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const user = await User.findByPk(user_id);
    if (!user) return sendErrorResponse(res, 404, 'Data pengguna tidak ditemukan.');

    const today = new Date();
    const birthDate = new Date(user.tanggal_lahir);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    age -= (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) ? 1 : 0;

    await user.update({ age });

    res.status(200).json({ message: 'Data pengguna berhasil diambil', user: user.toJSON() });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Terjadi kesalahan saat mengambil data pengguna.');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, name, email, city, prefered_category, tanggal_lahir } = req.body;
    const currentUsername = req.user.username;

    const updatedData = { username, name, email, city, prefered_category, tanggal_lahir };

    const [updatedRows] = await User.update(updatedData, { where: { username: currentUsername } });

    if (updatedRows === 0) {
      return sendErrorResponse(res, 404, 'Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan');
    }

    res.status(200).json({ message: 'Profil berhasil diubah', updatedData });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Terjadi kesalahan saat mengubah profil pengguna.');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout berhasil' });
};