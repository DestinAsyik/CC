require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { sequelize } = require('./Models'); 
const routes = require('./Routes'); 
const setupSwagger = require('./docs/swagger');

const app = express();
const PORT = process.env.PORT || 8080;

// Allowed Origins for CORS
const allowedOrigins = ['https://bangkit2024.up.railway.app', 
                        'http://localhost:8000', 
                        'http://localhost:3000', 
                        'https://destinasyikreccomenders-service-478353399681.asia-southeast2.run.app',
                        'https://destinasyikapi-service-478353399681.asia-southeast2.run.app'];

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Preflight Requests
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

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }, 
}));

app.get('/', async (req, res) => {
  try {
    res.send("API BERHASIL");
  } catch (error) {
    res.status(500).send('Error fetching image');
  }
});

// Routes
app.use('/api/destinAsyik/v1', routes);
setupSwagger(app);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}, 
  });
});

// Sequelize Initialization
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected and models synced.');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });