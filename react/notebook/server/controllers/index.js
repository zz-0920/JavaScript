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

const findUser = async (username) => {
    const _sql = `select * from user where username='${username}'`;
    return await allServices.query(_sql);
}

const register = async (username, password, nickname) => {
    const _sql = `insert into user (username, password, nickname, create_time) values ('${username}', '${password}', '${nickname}', '${new Date().getTime()}')`;
    return await allServices.query(_sql);
}

const findNodeListByType = async (note_type, userId) => {
    const _sql = `select * from note where note_type='${note_type}' and user_id=${userId} order by create_time desc`;
    return await allServices.query(_sql);
}

const findNoteDetailById = async (id) => {
    const _sql = `select * from note where id=${id}`;
    return await allServices.query(_sql);
}

const notePublish = async (note_title, note_content, note_img, note_type, create_time, update_time, userId) => {
    const _sql = `insert into note (note_title, note_content, note_img, note_type, create_time, update_time, user_id) values ('${note_title}', '${note_content}', '${note_img}', '${note_type}', '${create_time}', '${update_time}', '${userId}')`;
    return await allServices.query(_sql);
}

module.exports = {
    allServices,
    userLogin,
    findUser,
    register,
    findNodeListByType,
    findNoteDetailById,
    notePublish
}