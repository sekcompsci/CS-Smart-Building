import Model from '../model'

const Users = {
    ...Model,
    key: 'users',
    permittedAttrs: ['email']
}

export default Users