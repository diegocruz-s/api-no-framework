import { TileRepository } from "../repositories/tileRepository.js"

class TileService {
    constructor({ repository }){
        this.repository = repository
    }

    create (data) {
        return this.repository.create(data)
    }

    list (tileId) {
        return this.repository.list(tileId)
    }

    update (tileId, data) {
        return this.repository.update(tileId, data)

    }

    delete (tileId) {
        return this.repository.delete(tileId)

    }

}

export { 
    TileService
}
