import Users from './model'
import UsersSerializer from './serializer.js'

const UserController = {
    getAll(req, res) {
        Users.findAll()
        .then(data => {
            res.json(UsersSerializer.for('getAll', data))
        })
    },
    get(req, res) {
        Users.find(req.params.id)
        .then(data => {
            res.json(UsersSerializer.for('get', data))
        })
    },
    create(req, res) {
        const { name, email, tel, position, password } = req.body

        Users.create(name, email, tel, position, password)
            .then(user => {
                res
                // .header('Authorization', `Bearer ${Users.genToken(user)}`)
                .status(201)
                .json(user)
            }
        )
    },
    destroy(req, res) {
        const id = req.params.id

        Users.destroy(id)
            .then(uid => {
                res
                .status(200)
                .json(uid)
            })
    }
}

export default UserController