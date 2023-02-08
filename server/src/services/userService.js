class UserService {
    constructor({ repository }) {
        this.repository = repository
    }

    create(data) {
        return this.repository.create(data)
    }

    update(userId, data) {
        return this.repository.update(userId, data)
    }

    login(data) {
        return this.repository.login(data)
    }

    logout(userId, valueToken) {
        return this.repository.logout(userId, valueToken)
    }

}

export {
    UserService
}