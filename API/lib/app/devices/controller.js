import Users from './model'

const UserController = {
    getAll(req, res) {
        Users.findAll()
            .then(devices => {
                res.json(devices)
            })
    },
    get(req, res) {
        const id = req.params.id;

        Users.find(id)
            .then(device => {
                console.log(device)
                res.json(device)
            })
    },
    create(req, res) {
        const { name, gid } = req.body

        Users.create(name, gid)
            .then(devices => {
                res
                .status(201)
                .json(devices)
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
            .then(id => {
                res
                .status(204)
                .json(id)
            })
    }
}

export default UserController