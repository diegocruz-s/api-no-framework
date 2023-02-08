import http from 'node:http'
import { routes } from './routes.js'
import { checkAuth } from './utils/checkAuth.js'

const handler = (request, response) => {
    const { url, method } = request
    const [_, route, id] = url.split('/')
    let pathUrl

    if(id) {
        request.id = id
        pathUrl = `/${route}/id:${method.toLowerCase()}`
    } else {
        pathUrl = `/${route}:${method.toLowerCase()}`
    }

    const resultAuth = checkAuth(request, response, pathUrl)
    if(!resultAuth) {
        return
    }

    console.log('pathUrl:', pathUrl)

    const res = routes[pathUrl] || routes.default

    return res(request, response)
}

http.createServer(handler)
    .listen(3000, (err) => {
        if(err) console.log('Deu ruim', err)
        else console.log('Server running...')
    })
