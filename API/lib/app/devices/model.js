import mysql from 'nodejs-mysql'
import db from '../../db'
import Model from '../model'

const Users = {
    ...Model,

    key: 'devices',
    _id: 'did',

    create(name, gid) {
        return new Promise((resolve, reject) => {
            const sql = 'insert into ' + this.key + ' set ?'

            db.exec(sql, {
                name: name,
                gid: gid
            })
            .then(rows => { 
                return resolve({ did: rows.insertId, name: name, gid: gid })
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
                return resolve({ gid: id })
            })
            .catch(e => { 
                return reject(e) 
            })
        })
    }
}

export default Users