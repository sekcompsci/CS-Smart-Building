import { Users } from '../users'
import SessionsSerializer from './serializer'

const SessionsController = {
    login(req, res) {
        const { email, password } = req.body

        Users.findByEmail(email)
        .then(user => {
            Users.verify(user, password).then(isValid => {
                if(isValid) {
                    res
                        .header('Authorization', `Bearer ${Users.genToken(user)}`)
                        .status(201)
                        .json({user: SessionsSerializer.for('login', user)})
                } else {
                    res
                        .status(401)
                        .json({ user: { errors: ['Invalid credentials.'] } })
                }
            })
        })
    }
}

export default SessionsController