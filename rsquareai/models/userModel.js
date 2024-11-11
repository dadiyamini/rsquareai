const db = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

let connection;

async function createUser(user) {
    try {
        connection = await db.oracledb.getConnection();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const sql = `INSERT INTO SecUsers (USRID, USRLOGIN, USRPWD, USRFNAME, USRMOBILE, USREMAIL, USRENABLED) 
                     VALUES (:id, :login, :password, :fname, :mobile, :email, :enabled)`;
        const binds = [user.id, user.login, hashedPassword, user.fname, user.mobile, user.email, 1];
        await connection.execute(sql, binds, { autoCommit: true });
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

async function findUserByLoginOrEmail(login, email) {
    try {
        connection = await db.oracledb.getConnection();
        const sql = `SELECT USRID, USRLOGIN, USREMAIL FROM SecUsers WHERE USRLOGIN = :login OR USREMAIL = :email`;
        const result = await connection.execute(sql, [login, email]);
        if (result.rows && result.rows.length > 0) {
            const user = result.rows[0];
            return {
                USRID: user[0],
                USRLOGIN: user[1],
                USREMAIL: user[2]
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error finding user by login or email:', error);
        throw new Error('Error finding user');
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

async function findUserByLogin(login) {
    try {
        connection = await db.oracledb.getConnection();
        const sql = `SELECT USRID, USRLOGIN, USRPWD FROM SecUsers WHERE USRLOGIN = :login`;
        const result = await connection.execute(sql, [login]);
        if (result.rows && result.rows.length > 0) {
            const user = result.rows[0];
            return {
                USRID: user[0],
                USRLOGIN: user[1],
                USRPWD: user[2]
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error finding user by login:', error);
        throw new Error('Error finding user');
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

module.exports = { createUser, findUserByLogin, findUserByLoginOrEmail };