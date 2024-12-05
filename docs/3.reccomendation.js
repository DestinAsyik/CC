/**
 * @swagger
 * tags:
 *   name: Recommendation
 *   description: Fitur utama rekomendasi berdasarkan kategori, jarak, interaksi pengguna, dan estimasi biaya
 */ 

/**
 * @swagger
 * /recommendation/content:
 *   post:
 *     summary: Memberikan rekomendasi destinasi berdasarkan kategori preferensi pengguna
 *     tags:
 *       - Recommendation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rekomendasi berdasarkan kategori berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rekomendasi untuk kamu berdasarkan kategori preferensi"
 *                 preferredCategory:
 *                   type: string
 *                   example: "Bahari"
 *                 reccomByContent:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       place_name:
 *                         type: string
 *                         example: "Pantai Parangtritis"
 *                       description:
 *                         type: string
 *                         example: "Pantai yang indah dengan pemandangan sunset."
 *                       category:
 *                         type: string
 *                         example: "Bahari"
 *                       city:
 *                         type: string
 *                         example: "Yogyakarta"
 *       401:
 *         description: Token tidak diberikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Invalid token"
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan pada server"
 *                 error:
 *                   type: string
 *                   example: "Error detail here"
 */

/**
 * @swagger
 * /recommendation/nearby:
 *   post:
 *     summary: Memberikan rekomendasi destinasi berdasarkan lokasi pengguna
 *     tags:
 *       - Recommendation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *             properties:
 *               latitude:
 *                 type: number
 *                 format: float
 *                 example: -8.173073590748519
 *                 description: Latitude lokasi pengguna
 *               longitude:
 *                 type: number
 *                 format: float
 *                 example: 115.10513024047802
 *                 description: Longitude lokasi pengguna
 *     responses:
 *       200:
 *         description: Rekomendasi berdasarkan lokasi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rekomendasi untuk kamu berdasarkan lokasi"
 *                 reccomByJarak:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       place_name:
 *                         type: string
 *                         example: "Pantai Parangtritis"
 *                       description:
 *                         type: string
 *                         example: "Pantai yang indah dengan pemandangan sunset."
 *                       category:
 *                         type: string
 *                         example: "Bahari"
 *                       city:
 *                         type: string
 *                         example: "Yogyakarta"
 *       400:
 *         description: Input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Latitude atau longitude tidak ditemukan"
 *       401:
 *         description: Token tidak diberikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Invalid token"
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan pada server"
 *                 error:
 *                   type: string
 *                   example: "Error detail here"
 */

/**
 * @swagger
 * /recommendation/colaborative:
 *   post:
 *     summary: Memberikan rekomendasi destinasi berdasarkan aktivitas pengguna
 *     tags:
 *       - Recommendation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rekomendasi berdasarkan aktivitas berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rekomendasi untuk kamu berdasarkan aktivitasmu"
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       place_name:
 *                         type: string
 *                         example: "Pantai Parangtritis"
 *                       description:
 *                         type: string
 *                         example: "Pantai yang indah dengan pemandangan sunset."
 *                       category:
 *                         type: string
 *                         example: "Bahari"
 *                       city:
 *                         type: string
 *                         example: "Yogyakarta"
 *       401:
 *         description: Token tidak diberikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Invalid token"
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan pada server"
 *                 error:
 *                   type: string
 *                   example: "Error detail here"
 */

/**
 * @swagger
 * /fuel/{item_id}/cost:
 *   post:
 *     summary: Menghitung Estimasi biaya bahan bakar untuk destinasi tertentu
 *     tags:
 *       - Recommendation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: ID destinasi yang akan dihitung biaya bahan bakarnya
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userLat
 *               - userLon
 *             properties:
 *               userLat:
 *                 type: number
 *                 format: float
 *                 example: -8.173073590748519
 *                 description: Latitude lokasi pengguna
 *               userLon:
 *                 type: number
 *                 format: float
 *                 example: 115.10513024047802
 *                 description: Longitude lokasi pengguna
 *     responses:
 *       200:
 *         description: Perhitungan bahan bakar berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: string
 *                   example: "Pantai Parangtritis"
 *                 distance:
 *                   type: string
 *                   example: "35.42"
 *                 ticketPrice:
 *                   type: string
 *                   example: "15000"
 *                 fuelDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fuelType:
 *                         type: string
 *                         example: "pertalite"
 *                       fuelNeeded:
 *                         type: string
 *                         example: "2.95"
 *                       fuelCost:
 *                         type: string
 *                         example: "29500.00"
 *                       totalCost:
 *                         type: string
 *                         example: "44500.00"
 *       400:
 *         description: Input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Latitude dan longitude pengguna tidak ditemukan"
 *       404:
 *         description: Destinasi tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Destinasi tidak ditemukan"
 *       401:
 *         description: Token tidak diberikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Invalid token"
 *       500:
 *         description: Kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi kesalahan pada server"
 */