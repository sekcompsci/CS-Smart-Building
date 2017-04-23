import Serializer from '../serializer'

const UsersSerializer = {
    ...Serializer,

    get(user) {
        return this.serialize(user)
    },
    getAll(users) {
        return users.map(user => this.serialize(user))
    },
    create(user) {
        return this.serialize(user)
    },

    serialize(user) {
        const { uid, email, tel, isAdmin } = user
        return { uid, email, tel, isAdmin }
    }
}

export default UsersSerializer