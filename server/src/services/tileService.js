import { TileRepository } from "../repositories/tileRepository.js"

class TileService {
    constructor({ repository }){
        this.repository = repository
    }

    create (data) {
        return this.repository.create(data)
    }

    list (userId, tileId) {
        return this.repository.list(userId, tileId)
    }

    update (userId, tileId, data) {
        return this.repository.update(userId, tileId, data)

    }

    delete (userId, tileId) {
        return this.repository.delete(userId, tileId)

    }

}

export { 
    TileService
}
