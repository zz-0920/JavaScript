// 数据库相关操作
const mysql = require('mysql2/promise');
const config = require('../config/index.js');

// 数据库连接池
const pool = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

// 执行 sql 的方法
const allServices = {
    query: async (sql, values) => {
        try {
            // 通过连接池获取连接
            const connection = await pool.getConnection();
            // 执行增删改查的 sql 语句
            const [rows, fields] = await connection.query(sql, values);
            connection.release(); // 修改：使用 connection.release() 而不是 pool.releaseConnection()
            return rows; // 修改：直接返回 rows
        } catch (err) {
            console.log(err);
            throw err; // 修改：抛出错误而不是返回 Promise.reject
        }
        // 删除 finally 块，因为 connection 变量在这里不可访问
    }
}

// 登录要执行的函数
const userLogin = async (username, password) => {
    const _sql = `select * from user where username='${username}' and password='${password}'`;
    return await allServices.query(_sql);
}

module.exports = {
    allServices,
    userLogin,
}