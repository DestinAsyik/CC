/**
 * @swagger
 * tags:
 *   name: Destination
 *   description: Menambahkan destinasi wisata
 */

/**
 * @swagger
 * /destination/add:
 *   post:
 *     summary: Menambahkan destinasi wisata baru
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - place_name
 *               - description
 *               - category
 *               - city
 *               - latitude
 *               - longitude
 *               - image
 *             properties:
 *               place_name:
 *                 type: string
 *                 description: Nama destinasi wisata
 *                 example: "Pantai Parangtritis"
 *               description:
 *                 type: string
 *                 description: Deskripsi tentang destinasi wisata
 *                 example: "Pantai yang indah dengan pemandangan sunset"
 *               category:
 *                 type: string
 *                 description: Kategori destinasi wisata
 *                 example: "Bahari"
 *               city:
 *                 type: string
 *                 description: Kota destinasi wisata
 *                 example: "Yogyakarta"
 *               price:
 *                 type: integer
 *                 description: Harga tiket destinasi (opsional)
 *                 example: 5000
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitude dari lokasi destinasi
 *                 example: -7.8057
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitude dari lokasi destinasi
 *                 example: 110.3650
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Gambar destinasi yang diupload
 *                 example: "image.jpg"
 *     responses:
 *       201:
 *         description: Destinasi berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: "Destination berhasil ditambahkan"
 *                 data:
 *                   type: object
 *                   properties:
 *                     place_name:
 *                       type: string
 *                       example: "Pantai Parangtritis"
 *                     description:
 *                       type: string
 *                       example: "Pantai yang indah dengan pemandangan sunset"
 *                     category:
 *                       type: string
 *                       example: "Bahari"
 *                     city:
 *                       type: string
 *                       example: "Yogyakarta"
 *                     price:
 *                       type: integer
 *                       example: 5000
 *                     latitude:
 *                       type: number
 *                       format: float
 *                       example: -7.8057
 *                     longitude:
 *                       type: number
 *                       format: float
 *                       example: 110.3650
 *                     gambar:
 *                       type: string
 *                       example: "https://storage.googleapis.com/destinasyik/image.jpg"
 *       400:
 *         description: Data input tidak lengkap atau kategori tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Semua field wajib diisi kecuali gambar, rating, dan coordinate"
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan saat menambahkan destination"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
