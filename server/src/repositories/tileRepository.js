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
        const existsTile = this.list(data.id)
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

    list (tileId) {
        const allTiles = this.#allTile()
        if(!tileId) {
            return allTiles
        }

        return allTiles.find(tile => tile.id === tileId)
    }

    update (tileId, data) { 
        const allTiles = this.#allTile()
        const tileForUpdate = this.list(tileId)

        if(!tileForUpdate) {
            return {
                error: 'Tile not found'
            }
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

    delete(tileId) {
        const allTiles = this.#allTile()
        const existsTile = this.list(tileId)
        console.log(existsTile)
        if(!existsTile) {
            this.error.message = 'Tile not exists'
            this.error.status = 404
            
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
