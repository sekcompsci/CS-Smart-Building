import Users from './model'
import UsersSerializer from './serializer.js'

const UserController = {
    getAll(req, res) {
        Users.findAll()
        .then(data => {
            res.json({ user: UsersSerializer.for('getAll', data) })
        })
    },
    get(req, res) {
        Users.find(req.params.id)
        .then(data => {
            res.json({ user: UsersSerializer.for('get', data) })
        })
    },
    create(req, res) {
        const { name, email, password, tel } = req.body

        Users.create(name, email, password, tel)
            .then(user => {
                res
                .header('Authorization', `Bearer ${Users.genToken(user)}`)
                .status(201)
                .json(user)
            }
        )
    }
}

export default UserController