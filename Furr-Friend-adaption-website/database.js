const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'furr_friend',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function connectToDatabase() {
  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  } finally {
    // Release the connection in the finally block
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { db, connectToDatabase};
