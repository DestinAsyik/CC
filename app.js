require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routes
const authRoutes = require('./Routes/auth');
const profileRoutes = require('./Routes/profile');
const bookmarkRoutes = require('./Routes/bookmark');
const reviewRoutes = require('./Routes/review');
const recomRoutes =  require('./Routes/reccom');

// Middleware
const { authenticateToken } = require('./midleware/authMidleware');

const app = express();
const allowedOrigins = ['https://bangkit.com'];

// CORS Configuration
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Handle preflight requests
app.options('*', (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.sendStatus(204);
});

// Other Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure : true }
}));

// Sequelize Initialization
const sequelize = new Sequelize(process.env.MYSQL_URL);


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Routes
app.use('/api/destinAsyik', authRoutes);
app.use('/api/destinAsyik', authenticateToken, profileRoutes);
app.use('/api/destinAsyik', authenticateToken, bookmarkRoutes);
app.use('/api/destinAsyik', authenticateToken, reviewRoutes);
app.use('/api/destinAsyik', authenticateToken, recomRoutes);


const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Berjalan di PORT ${PORT}`);
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});