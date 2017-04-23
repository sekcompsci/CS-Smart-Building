import controller from './controller'

export function setup(router) {
    router
        .post('/login', controller.login)
}