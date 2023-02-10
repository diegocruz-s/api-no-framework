import { readFileSync } from 'node:fs'
import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const checkAuth = (request, response, pathUrl) => {
    if(pathUrl.includes('login') || pathUrl.includes('user:post')) {
        return true
    }
    try {
        const authorization = request.headers.authorization

        if(!authorization) {
            throw new Error('Authentication required')
        }

        const [, token] = authorization.split(' ')

        if(!token) {
            throw new Error('Token not found')
        }

        const checkToken = JSON.parse(
            readFileSync(join(__dirname, '../../database', 'tokens.json'))
        ).filter(elementToken => elementToken.value === token)[0]

        if(!checkToken) {
            throw new Error('Token not found')
        }

        request.userId = token.split('_')[0]
        request.valueToken = token
        return true
    } catch (error) {
        response.writeHead(401, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ error: error.message }))
        response.end()
        return false
    }
    
}
