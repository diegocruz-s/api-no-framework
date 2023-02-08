import { readFileSync, writeFileSync } from 'node:fs'

class TileRepository {
    constructor({ file }){
        this.file = file
        this.error = {
            status: 400,
            message: '',
            code: 'BAD_REQUEST'
        }
    }
    

    #allTile () {
        const datas = JSON.parse(readFileSync(this.file))
        return datas
    }

    create (data) {
        const allTiles = this.#allTile()
        const existsTile = this.list(data.id)[0]
        console.log('et', existsTile)
        if(existsTile) {
            this.error.message = 'Tile is already exists'
            this.error.status = 409

            return { error: this.error }
        }

        const newTiles = [...allTiles, data]

        writeFileSync(this.file, JSON.stringify(newTiles))

        return {
            tile: data,
            success: 'Tile created' 
        }

    }

    list (userId, tileId) {
        console.log(userId)
        const allTiles = this.#allTile().filter(tile => tile.userId === userId)
        if(!tileId) {
            return allTiles
        }

        return allTiles.find(tile => tile.id === tileId)
    }

    update (userId, tileId, data) { 
        const allTiles = this.#allTile()
        const tileForUpdate = this.list(userId, tileId)
        if(!tileForUpdate) {
            return {
                error: 'Tile not found'
            }
        }

        if(userId !== tileForUpdate.userId) {
            this.error.message = 'You can only delete your tiles'
            this.error.status = 422
            
            return { error: this.error }
        }

        const newDatasTile = {}

        Object.keys(data).map(key => {
            if(!!data[key]) {
                newDatasTile[key] = data[key]
            }
        })

        const newTile = {...tileForUpdate, ...newDatasTile}

        const newAllTiles = allTiles.map(tile => {
            if(tile.id === tileId) return newTile
            else return tile
        })

        writeFileSync(this.file, JSON.stringify(newAllTiles))

        return {
            success: 'Tile updated'
        }

    }

    delete(userId, tileId) {
        const allTiles = this.#allTile()
        const existsTile = this.list(userId, tileId)
        console.log('et:', existsTile)
        if(!existsTile) {
            this.error.message = 'Tile not exists'
            this.error.status = 404
            
            return { error: this.error }
        }

        if(userId !== existsTile.userId) {
            this.error.message = 'You can only delete your tiles'
            this.error.status = 422
            
            return { error: this.error }
        }

        const newAllTiles = allTiles.filter(tile => tile.id !== tileId)

        writeFileSync(this.file, JSON.stringify(newAllTiles))

        return {
            success: 'Tile deleted'
        }
    }  

}

export {
    TileRepository
}
