import { randomUUID } from 'node:crypto';
import { generateTileService } from "./factories/tileFactory.js";
import { Tile } from './models/Tile.js'
const tileService = generateTileService()

const routes = {
    '/list:get': async(request, response) => {
        const allTiles = tileService.list()

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ tiles: allTiles }))
        response.end()
    },

    '/list/id:get': async(request, response) => {
        const id = request.id
        const tile = tileService.list(id)

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ tile }))
        response.end()
    },

    '/tile:post': async(request, response) => {
        for await (const data of request) {
            try {
                const datasTile = JSON.parse(data)
                const { name, image, url } = datasTile
                const id = randomUUID()

                const newTile = new Tile({id, name, image, url})
                const verifyTile = newTile.isValid()
                console.log(verifyTile)
                if(!verifyTile.valid) {
                    throw new Error(verifyTile.error)
                }

                const tile = tileService.create(newTile)

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
    },

    '/tile/id:delete': async (request, response) => {
        const id = request.id
        const res = tileService.delete(id)
        if(res.error) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.write(JSON.stringify(res.error))
            return response.end()
        }

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify(res))
        return response.end()
    },

    '/tile/id:patch': async (request, response) => {
        const id = request.id
        
        for await (const data of request) {
            try {
                const datasUpdate = JSON.parse(data)
                Object.keys(datasUpdate).map(key => {
                    if(key !== 'name' && key !== 'url' && key !== 'image') {
                        throw new Error('Property undefined')
                    }
                })
                const res = tileService.update(id, datasUpdate)

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
    },

    default: async(request, response) => {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ error: 'Route not found' }))
        response.end()
    },
}

export {
    routes
}