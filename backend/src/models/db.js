import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

export const query = (sql, params) => pool.execute(sql, params);
export const getConnection = () => pool.getConnection();


/*
crear un .env con las siguientes variables:
// backend/.env
MYSQL_USER=root
MYSQL_PASSWORD=contraseña
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=vestinova_db
*/