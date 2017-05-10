import mysql from 'nodejs-mysql'
import configs from '../config'
import db from '../db'

const Model = {
    findAll() {
        return this.collection()
        .then(data => {
            return data
        })
    },
    find(id) {
        this.findRecord(id)
        .then(data => {
            return data
        })
    },
    create(attrs) {
        const collection = this.collection()
        const record = this.withPermittedAttrs(attrs, { id: collection.length + 1 })

        this.setCollection([...collection, record])
        return record
    },
    update(id, attrs) {
        const collection = this.collection()
        const index = this.findIndex(id)
        const updatedRecord = this.withPermittedAttrs(attrs, collection[index])
        this.setCollection([
            ...collection.slice(0, index), 
            updatedRecord, 
            ...collection.slice(index + 1)
        ])

        return updatedRecord
    },
    destroy(id) {
        const collection = this.collection()
        const index = this.findIndex(id)

        this.setCollection([
            ...collection.slice(0, index),
            ...collection.slice(index + 1)
        ])
    },

    collection() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM ' + this.key

            db.exec(sql)
            .then(rows => {
                return resolve(rows)
            })
            .catch(e => {
                return reject(e)
            })
        })
    },
    findRecord(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM ' + this.key + ' WHERE ' + this._id + ' = ? LIMIT 1'

            db.exec('SELECT * FROM users WHERE uid = ? LIMIT 1', [id])
            .then(rows => {
                rows.forEach(row => { return row })
            })
            .catch(e => {
                return e
            })
        })
    },
    findIndex(id) {
        this.collection().findIndex(record => record.id === +id)
    },
    withPermittedAttrs(attrs, init = {}) {
        return this.permittedAttrs.reduce(
            (record, attr) => 
                attrs[attr] ? { ...record, [attr]: attrs[attr] } : record
        , init)
    },
    setCollection(collection) {
        return  db[this.key] = collection
    }
}

export default Model