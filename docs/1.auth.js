/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi pengguna mulai dari register, login, get profile, update profile, dan logout
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
 *                   example: "Pengguna berhasil terdaftar"
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "aligondrong"
 *                     name:
 *                       type: string
 *                       example: "Ali Gondrong Labanan"
 *                     email:
 *                       type: string
 *                       example: "aligondrong@gmail.com"
 *                     city:
 *                       type: string
 *                       example: "Sleman"
 *                     prefered_category:
 *                       type: string
 *                       example: "Alam"
 *       400:
 *         description: Kesalahan validasi input atau email sudah digunakan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email sudah terdaftar. Silakan gunakan email lain."
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi kesalahan saat mendaftar pengguna."
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
 *                 example: "aligondrong"
 *               password:
 *                 type: string
 *                 description: Kata sandi pengguna
 *                 example: "gondrong123"
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
 *                   example: "Login berhasil"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "aligondrong"
 *                     name:
 *                       type: string
 *                       example: "Ali Gondrong Labanan"
 *                     email:
 *                       type: string
 *                       example: "aligondrong@gmail.com"
 *                     city:
 *                       type: string
 *                       example: "Sleman"
 *                     prefered_category:
 *                       type: string
 *                       example: "Alam"
 *       400:
 *         description: Data input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Field username harus diisi."
 *       401:
 *         description: Kredensial salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Kata sandi salah."
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi kesalahan saat login."
 */

/**
 * @swagger
 * /auth/profile:
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
 *                   example: "Data pengguna berhasil diambil"
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "aligondrong"
 *                     name:
 *                       type: string
 *                       example: "Ali Gondrong Labanan"
 *                     email:
 *                       type: string
 *                       example: "aligondrong@gmail.com"
 *                     city:
 *                       type: string
 *                       example: "Sleman"
 *                     prefered_category:
 *                       type: string
 *                       example: "Alam"
 *                     age:
 *                       type: integer
 *                       example: 49
 *       401:
 *         description: Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: No token provided."
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi kesalahan saat mengambil data pengguna."
 */

/**
 * @swagger
 * /auth/profile/update:
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
 *                 example: "alidongok"
 *               name:
 *                 type: string
 *                 description: Nama lengkap baru
 *                 example: "Ali Gondrong Dongok"
 *               email:
 *                 type: string
 *                 description: Email baru
 *                 example: "alidongok@gmail.com"
 *               city:
 *                 type: string
 *                 description: Kota baru
 *                 example: "Yogyakarta"
 *               prefered_category:
 *                 type: string
 *                 description: Kategori preferensi baru
 *                 example: "Budaya"
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
 *                 example: "1975-01-01"
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
 *                   example: "Profil berhasil diubah"
 *                 updatedData:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "alidongok"
 *                     name:
 *                       type: string
 *                       example: "Ali Gondrong Labanan Dongok"
 *                     email:
 *                       type: string
 *                       example: "alidongok@gmail.com"
 *                     city:
 *                       type: string
 *                       example: "Yogyakarta"
 *                     prefered_category:
 *                       type: string
 *                       example: "Budaya"
 *       400:
 *         description: Data input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Field username harus diisi."
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan."
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi kesalahan saat mengubah profil pengguna."
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
 *                   example: "Logout berhasil"
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