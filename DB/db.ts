import mysql from 'mysql2'

const pool=mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    database:process.env.DATABASE_NAME,
    password:process.env.DATABASE_PASSWORD,
    port:process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 0
})

const db=pool.promise()

export default db