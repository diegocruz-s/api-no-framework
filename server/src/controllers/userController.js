import { randomUUID } from 'node:crypto';
import { Tile } from '../models/Tile.js'
import { User } from '../models/User.js';

class UserController {
    constructor({ service }) {
        this.service = service
    }

    async login (request, response) {
        for await (const data of request) {
            const body = JSON.parse(data)
            if(!body.email || !body.password) {
                response.writeHead(422, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify({ error: {
                    message: ['Invalid datas'],
                    code: 'BAD_REQUEST',
                    status: 422
                }}))
                return response.end()
            }

            const datasLogin = this.service.login({
                email: body.email,
                password: body.password
            })
            response.writeHead(200, { "Content-Type": "application/json" })
            response.write(JSON.stringify(datasLogin))
            return response.end()
        }
    } 

    async logout (request, response) {
        const userId = request.userId
        const valueToken = request.valueToken
        this.service.logout(userId, valueToken)

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify({ success: 'Logout done successfully' }))
        return response.end()
    }

    async create (request, response) {
        for await (const data of request) {
            try {
                const datasUser = JSON.parse(data)
                console.log(datasUser)
                const { name, email, password } = datasUser

                const id = randomUUID()

                const newUser = new User({id, name, email, password})
                const verifyUser = newUser.isValid()
                
                if(!verifyUser.valid) {
                    throw new Error(verifyUser.error)
                }

                const user = this.service.create(newUser)

                response.writeHead(201, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify(user))
                response.end()

            } catch (error) {
                const messageError = error.message.split(',')
                
                response.writeHead(400, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify({ error: {
                    message: messageError,
                    status: 400,
                    code: 'BAD_REQUEST'
                } }))
                return response.end()
            }
        }
    }

    async update (request, response) {
        for await (const data of request) {
            try {
                const datasUser = JSON.parse(data)
                Object.keys(datasUser).map(key => {
                    if(key !== 'password' && key !== 'name') {
                        throw new Error('Invalid datas')
                    }
                })
                const userId = request.userId
                console.log(userId)
                const res = this.service.update(userId, datasUser)

                response.writeHead(201, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify({ data: res }))
                return response.end()

            } catch (error) {
                const messageError = error.message.split(',')
                
                response.writeHead(400, { 'Content-Type': 'application/json' })
                response.write(JSON.stringify({ error: messageError }))
                return response.end()
            }
        }
    }
    
}

export {
    UserController
}