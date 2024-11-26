/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi pengguna mulai dari register, login, get profile, update profile
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Mendaftarkan pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - name
 *               - password
 *               - tanggal_lahir
 *               - email
 *               - city
 *               - prefered_category
 *             properties:
 *               username:
 *                 type: string
 *                 example: "aligondrong"
 *                 description: Nama pengguna
 *               name:
 *                 type: string
 *                 example: "Ali Gondrong Labanan"
 *                 description: Nama lengkap pengguna
 *               password:
 *                 type: string
 *                 example: "gondrong123"
 *                 description: Kata sandi pengguna
 *               tanggal_lahir:
 *                 type: string
 *                 example: "1974-03-01"
 *                 format: date
 *                 description: Tanggal lahir pengguna
 *               email:
 *                 type: string
 *                 example: "aligondrong@gmail.com"
 *                 description: Alamat email pengguna
 *               city:
 *                 type: string
 *                 example: "Sleman"
 *                 description: Kota tempat tinggal pengguna
 *               prefered_category:
 *                 type: string
 *                 example: "Alam"
 *                 description: Kategori preferensi baru
 *                 enum:
 *                   - Budaya
 *                   - Taman Hiburan
 *                   - Cagar Alam
 *                   - Bahari
 *                   - Pusat Perbelanjaan
 *                   - Tempat Ibadah
 *                   - Agrowisata
 *                   - Belanja
 *                   - Alam
 *                   - Rekreasi
 *                   - Religius
 *     responses:
 *       201:
 *         description: Pengguna berhasil terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     city:
 *                       type: string
 *                     prefered_category:
 *                       type: string
 *       400:
 *         description: Kesalahan validasi input atau email sudah digunakan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna dan menghasilkan token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nama pengguna atau email
 *               password:
 *                 type: string
 *                 description: Kata sandi pengguna
 *     responses:
 *       200:
 *         description: Login berhasil, token JWT diberikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     city:
 *                       type: string
 *                     prefered_category:
 *                       type: string
 *       400:
 *         description: Data input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Kredensial salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Mendapatkan profil pengguna
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     city:
 *                       type: string
 *                     prefered_category:
 *                       type: string
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Memperbarui profil pengguna
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nama pengguna baru
 *               name:
 *                 type: string
 *                 description: Nama lengkap baru
 *               email:
 *                 type: string
 *                 description: Email baru
 *               city:
 *                 type: string
 *                 description: Kota baru
 *               prefered_category:
 *                 type: string
 *                 description: Kategori preferensi baru
 *                 enum:
 *                   - Budaya
 *                   - Taman Hiburan
 *                   - Cagar Alam
 *                   - Bahari
 *                   - Pusat Perbelanjaan
 *                   - Tempat Ibadah
 *                   - Agrowisata
 *                   - Belanja
 *                   - Alam
 *                   - Rekreasi
 *                   - Religius
 *               tanggal_lahir:
 *                 type: string
 *                 format: date
 *                 description: Tanggal lahir baru
 *     responses:
 *       200:
 *         description: Profil berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedData:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     city:
 *                       type: string
 *                     prefered_category:
 *                       type: string
 *       400:
 *         description: Data input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout pengguna
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */