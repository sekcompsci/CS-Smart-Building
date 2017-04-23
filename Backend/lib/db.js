import mysql from 'nodejs-mysql'
import config from './config'

const db = mysql.getInstance({
	host: config.db_host,
    port: 3306,
    user: config.db_user,
    password: config.db_pass,
    database: 'senior'
})

export default db