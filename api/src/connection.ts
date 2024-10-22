import 'dotenv/config';
import mariadb from 'mariadb';

// Create DB connection pool
const pool = mariadb.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

export default pool;