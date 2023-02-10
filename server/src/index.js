import http from 'node:http'
import { routes } from './routes.js'
import { checkAuth } from './utils/checkAuth.js'

function handleCors(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
    return;
    } else {
        next()
    }
}

const handler = (request, response) => {
    handleCors(request, response, () => {
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
    })    
}

http.createServer(handler)
    .listen(3000, (err) => {
        if(err) console.log('Deu ruim', err)
        else console.log('Server running...')
    })
    