import mariadb,{ PoolConnection } from 'mariadb';

// Create DB connection pool
const pool = mariadb.createPool({
    connectionLimit: 3,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT as string)
});

// Wrapper function to execute queries + release DB connections when done
export const execute = async (query: string, params?: any[]) => {
    let conn: PoolConnection | undefined;
    try {
        conn = await pool.getConnection();
        return await conn.query(query, params);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

// Clean-up function that closes all active connections in the pool
export const closePool = async () => {
    await pool.end();
};

export default pool;