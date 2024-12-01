/**
 * @swagger
 * tags:
 *   name: Interaction
 *   description: Interaksi pengguna mulai dari bookmark, likes, dan review
 */

/**
 * @swagger
 * /bookmarks/toggle-bookmark:
 *   post:
 *     summary: Menambahkan atau menghapus bookmark berdasarkan item_id
 *     tags: [Interaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_id
 *             properties:
 *               item_id:
 *                 type: integer
 *                 example: 5
 *                 description: ID destinasi yang akan ditambahkan atau dihapus dari bookmark
 *     responses:
 *       201:
 *         description: Bookmark berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bookmark berhasil ditambahkan"
 *                 newBookmark:
 *                   type: object
 *                   properties:
 *                     bookmark_id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 10
 *                     item_id:
 *                       type: integer
 *                       example: 5
 *       200:
 *         description: Bookmark berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bookmark berhasil dihapus"
 *       400:
 *         description: item_id tidak ditemukan di request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "item_id tidak ditemukan di request body"
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
 *                   example: "Terjadi kesalahan pada server."
 */

/**
 * @swagger
 * /bookmarks/get:
 *   get:
 *     summary: Mendapatkan daftar bookmark pengguna
 *     tags: [Interaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar bookmark berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data berhasil diambil"
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookmark_id:
 *                         type: integer
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         example: 10
 *                       item_id:
 *                         type: integer
 *                         example: 5
 *                       Destination:
 *                         type: object
 *                         properties:
 *                           item_id:
 *                             type: integer
 *                             example: 5
 *                           place_name:
 *                             type: string
 *                             example: "Pantai Parangtritis"
 *                           description:
 *                             type: string
 *                             example: "Pantai yang indah dengan pemandangan sunset."
 *                           category:
 *                             type: string
 *                             example: "Bahari"
 *                           city:
 *                             type: string
 *                             example: "Yogyakarta"
 *                           price:
 *                             type: integer
 *                             example: 5000
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
 *                   example: "Terjadi kesalahan saat mengambil data bookmark."
 */

/**
 * @swagger
 * /likes/toggle-like:
 *   post:
 *     summary: Menambahkan atau menghapus like untuk sebuah destinasi berdasarkan `item_id`
 *     tags: [Interaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_id
 *             properties:
 *               item_id:
 *                 type: integer
 *                 example: 5
 *                 description: ID destinasi yang akan di-like atau dihapus like-nya
 *     responses:
 *       201:
 *         description: Like berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Likes ditambahkan"
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       example: true
 *                     newLike:
 *                       type: object
 *                       properties:
 *                         like_id:
 *                           type: integer
 *                           example: 1
 *                         user_id:
 *                           type: integer
 *                           example: 10
 *                         item_id:
 *                           type: integer
 *                           example: 5
 *       200:
 *         description: Like berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Likes berhasil dihapus"
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Validasi input gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Item tidak ditemukan"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
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
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan pada server"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Mencari destinasi berdasarkan kata kunci
 *     tags:
 *       - Interaction
 *     parameters:
 *       - in: query
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *           example: jawa
 *         description: "Kata kunci pencarian. Contoh: jawa"
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: "Halaman hasil pencarian. Default: 1"
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           example: 15
 *         description: "Jumlah hasil per halaman. Default: 15. Maksimal: 100"
 *     responses:
 *       200:
 *         description: "Pencarian berhasil"
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
 *                   example: Pencarian berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           item_id:
 *                             type: integer
 *                             example: 1
 *                           place_name:
 *                             type: string
 *                             example: Pantai Parangtritis
 *                           description:
 *                             type: string
 *                             example: Pantai yang indah dengan pemandangan sunset
 *                           category:
 *                             type: string
 *                             example: Bahari
 *                           city:
 *                             type: string
 *                             example: Yogyakarta
 *                           rating_avg:
 *                             type: number
 *                             format: float
 *                             example: 4.5
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *                     totalPages:
 *                       type: integer
 *                       example: 4
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: "Query parameter tidak valid"
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
 *                   example: Query tidak boleh kosong
 *       500:
 *         description: "Kesalahan server"
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
 *                   example: Terjadi kesalahan saat pencarian
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

