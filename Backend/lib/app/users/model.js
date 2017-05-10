import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql from 'nodejs-mysql'
import config from '../../config'
import db from '../../db'
import Model from '../model'

const Users = {
    ...Model,

    key: 'users',
    _id: 'uid',
    permittedAttrs: ['email'],

    create(name, email, password, tel) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 12, function(err, hash) {
                if(err) return reject(err)

                db.exec('insert into users set ?', {
                    name: name,
                    email: email,
                    password: hash,
                    tel: tel,
                    isAdmin: false
                })
                .then(rows => { 
                    console.log('create user success.')
                    return resolve({ uid: rows.insertId, email: email }) 
                })
                .catch(e => { 
                    console.log('create user failed.')
                    return reject(e) 
                })
            });
        })
    },
    genToken(user) {
        return jwt.sign({ sub: user.uid }, config.secretKey, { expiresIn: '1h' })
    },
    findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.exec('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
            .then(rows => {
                rows.forEach(row => { return resolve(row) })
            })
            .catch(e => {
                return reject(e)
            })
        })
    },
    verify(user, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(err) return reject(err)

                return resolve(res)
            })
        })
    }
}

export default Users