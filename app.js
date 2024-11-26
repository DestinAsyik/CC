require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const config = require('./config/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Routes
const authRoutes = require('./Routes/auth');
const profileRoutes = require('./Routes/profile');
const bookmarkRoutes = require('./Routes/bookmark');
const reviewRoutes = require('./Routes/review');
const recomRoutes =  require('./Routes/reccom');
const likeRoutes = require('./Routes/likes');
const costRoutes = require('./Routes/fuel');
const destinationRoutes = require('./Routes/destination');
const userbarRoutes = require('./Routes/userbar');


// Middleware
const { authenticateToken } = require('./midleware/authMidleware');



const app = express();
const allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:3000',
    undefined
];

// Create upload directory if it doesn't exist
const uploadDir = process.env.NODE_ENV === 'production' ? '/tmp' : 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// CORS Configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://api-destinasyik.vercel.app']
        : ['http://localhost:8000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.options('*', cors());

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
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    dialectModule: require('mysql2'),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        connectTimeout: 60000,
        // SSL for production (if your DB requires it)
        ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: true
        } : null
    }
});

// Add retry logic for database connection
const connectWithRetry = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    }
};

connectWithRetry();

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      swagger: '2.0',
      info: {
        title: 'DestinAsyik API Documentation',
        version: '1.0.0',
        description: 'API documentation for DestinAsyik',
      },
      basePath: '/api/v1',
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [{
        bearerAuth: []
      }],
    },
    apis: ['./Routes/*.js'],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Add CORS headers specifically for Swagger
app.use('/api/docs', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const router = express.Router();
app.use('/api/v1', router);

// Public Routes
router.use(authRoutes);

// Private Routes
router.use(authenticateToken, recomRoutes);
router.use(authenticateToken, likeRoutes);
router.use(authenticateToken, reviewRoutes);
router.use(authenticateToken, profileRoutes);
router.use(authenticateToken, bookmarkRoutes);
router.use(authenticateToken, destinationRoutes);
router.use(authenticateToken, costRoutes);
router.use(authenticateToken, userbarRoutes);

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Berjalan di PORT ${PORT}`);
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});