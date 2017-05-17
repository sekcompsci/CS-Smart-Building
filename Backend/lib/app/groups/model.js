import mysql from 'nodejs-mysql'
import db from '../../db'
import Model from '../model'

const Users = {
    ...Model,

    key: 'groups',
    _id: 'gid',

    create(name, description) {
        return new Promise((resolve, reject) => {
            const sql = 'insert into ' + this.key + ' set ?'
            description = description? description : ''

            db.exec(sql, {
                name: name,
                description: description
            })
            .then(rows => {
                return resolve({ gid: rows.insertId, name: name, description: description })
            })
            .catch(e => {
                return reject(e) 
            })
        })
    },
    destroy(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM ' + this.key + ' WHERE ?'

            db.exec(sql, { gid: id })
            .then(rows => { 
                return resolve(id)
            })
            .catch(e => { 
                return reject(e) 
            })
        })
    }
}

export default Users