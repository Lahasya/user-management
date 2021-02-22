const mysql = require('mysql');
const pool = mysql.createPool({
    user: 'vlqwfbxt_lahasya',
    password: 'vlqwfbxt_lahasya1!',
    database: 'vlqwfbxt_user_management',
    host: '103.212.121.53'
    });
    
    pool.getConnection((err, connection) => {
    if (err) {
    console.log(err);
    } else {
    connection.query('SELECT * FROM users', (_err, data) => console.log(data));
    }
    });