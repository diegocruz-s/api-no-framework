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

        request.userId = token.split('_')[0]
        return true
    } catch (error) {
        response.writeHead(401, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ error: error.message }))
        response.end()
        return false
    }
    
}
