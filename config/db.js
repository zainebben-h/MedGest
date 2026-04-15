// config/db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "medgest",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/matchpro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connecté à MongoDB');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
