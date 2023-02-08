import { randomUUID } from 'node:crypto';
import { Tile } from '../models/Tile.js'

class TileController {
    constructor({ service }) {
        this.service = service
    }

    async list(request, response) {
        const userId = request.userId
        const allTiles = this.service.list(userId)

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ tiles: allTiles }))
        response.end()
    }

    async listId (request, response) {
        const id = request.id
        const userId = request.userId
        const tile = this.service.list(userId, id)

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ tile }))
        response.end()
    }

    async create (request, response) {
        for await (const data of request) {
            try {
                const datasTile = JSON.parse(data)
                const { name, image, url } = datasTile
                const userId = request.userId
                const id = randomUUID()

                const newTile = new Tile({id, name, image, url, userId})
                const verifyTile = newTile.isValid()
                
                if(!verifyTile.valid) {
                    throw new Error(verifyTile.error)
                }

                const tile = this.service.create(newTile)

                response.writeHead(201, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify(tile))
                response.end()

            } catch (error) {
                const messageError = error.message.split(',')
                
                response.writeHead(400, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify({ error: messageError }))
                return response.end()
            }
        }
    }

    async update (request, response) {
        const id = request.id
        const userId = request.userId
        
        for await (const data of request) {
            try {
                const datasUpdate = JSON.parse(data)
                Object.keys(datasUpdate).map(key => {
                    if(key !== 'name' && key !== 'url' && key !== 'image') {
                        throw new Error('Property undefined')
                    }
                })
                const res = this.service.update(userId, id, datasUpdate)

                response.writeHead(res.error ? 404 : 200, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify(res))
                return response.end()
            } catch (error) {
                console.log('error', error.message)
                response.writeHead(422, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify({ error: error.message }))
                return response.end()
            }
            
        }
    }

    async delete (request, response) {
        const id = request.id
        const userId = request.userId
        const res = this.service.delete(userId, id)
        if(res.error) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.write(JSON.stringify(res.error))
            return response.end()
        }

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify(res))
        return response.end()
    }
}

export {
    TileController
}