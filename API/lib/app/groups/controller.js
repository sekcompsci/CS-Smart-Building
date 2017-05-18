import Users from './model'

const UserController = {
    getAll(req, res) {
        Users.findAll()
        .then(group => {
            res.json(group)
        })
    },
    get(req, res) {
        Users.find(req.params.id)
        .then(group => {
            res.json(group)
        })
    },
    create(req, res) {
        const { name, description } = req.body

        Users.create(name, description)
            .then(group => {
                res
                .status(201)
                .json(group)
            }
        )
    },
    update(req, res) {
        const id = req.params.id

        const article = Articles.update(id, req.body)
        res.status(200).json({ article })
    },
    destroy(req, res) {
        const id = req.params.id

        Users.destroy(id)
            .then(gid => {
                res
                .status(200)
                .json(gid)
            })
    }
}

export default UserController