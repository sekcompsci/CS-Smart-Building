import Serializer from '../serializer'

const SessionsSerializer = {
    ...Serializer,

    login(user) {
        const { uid, name, email, tel, isAdmin } = user

        return { uid, name, email, tel, isAdmin }
    }
}

export default SessionsSerializer