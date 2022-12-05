import mysql from 'mysql2';
export const connection = mysql.createConnection({
    host: 'ryusu.cloud',
    user: 'root',
    password: 'RoseCat21*',
    database: 'expenses'
});