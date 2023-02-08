import { TileController } from './controllers/tileController.js';
import { UserController } from './controllers/userController.js';
import { generateTileService } from "./factories/tileFactory.js";
import { generateUserService } from './factories/userFactory.js';

const tileController = new TileController({
    service: generateTileService()
})
const userController = new UserController({
    service: generateUserService()
})

const routes = {
    '/login:post': async(request, response) => {
        return userController.login(request, response)
    },

    '/user:post': async(request, response) => {
        return userController.create(request, response)
    },

    '/user:patch': async(request, response) => {
        return userController.update(request, response)
    },

    '/logout:post': async(request, response) => {
        return userController.logout(request,response)
    },

    '/tile:get': async(request, response) => {
        return tileController.list(request, response)
    },

    '/tile/id:get': async(request, response) => {
        return tileController.listId(request, response)
    },

    '/tile:post': async(request, response) => {
        return tileController.create(request, response)
    },

    '/tile/id:delete': async (request, response) => {
        return tileController.delete(request, response)
    },

    '/tile/id:patch': async (request, response) => {
        return tileController.update(request, response)
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