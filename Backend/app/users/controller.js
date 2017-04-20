import Users from './model'

const UserController = {
    getAll(req, res) {
        res.json({
            users: Users.findAll()
        })
    },
    get(req, res) {
        res.json({
            user: Users.find(req.params.id)
        })
    },
    create(req, res) {
        const user = Users.create({ email: req.body.email })
        res.json({
            user
        })
    }
}

export default UserController