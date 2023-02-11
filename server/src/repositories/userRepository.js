import { readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { hashPwd } from '../utils/generateHash.js'

// temp
import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateToken } from '../utils/generateToken.js'
import { randomUUID } from 'node:crypto'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// temp

class UserRepository {
    constructor({ file, fileToken }) {
        this.file = file
        this.fileToken = fileToken
        this.error = {
            message: '',
            status: 422,
            code: 'BAD_REQUEST'
        }
    }

    create (data) {
        const allUsers = JSON.parse(readFileSync(this.file))
        const existsUser = allUsers.find(user => user.email === data.email)
        
        if(!!existsUser) {
            this.error.message = ['Email already used']
            this.error.status = 422
            return {
                error: this.error
            }
        }

        data.password = hashPwd(data.password)
        allUsers.push(data)
        writeFileSync(this.file, JSON.stringify(allUsers))

        delete data.password

        return {
            user: data,
            success: 'User created successfully'
        }

    }

    update (userId, data) {
        const allUsers = JSON.parse(readFileSync(this.file))

        const userForId = allUsers.find(user => user.id === userId)
        if(data.email) {
            this.error.status = 422
            this.error.message = 'Email cannot be exchanged'
            return {
                error: this.error
            }
        }
        
        const newDatasUser = {}

        Object.keys(data).map(key => {
            if(!!data[key]) {
                newDatasUser[key] = data[key]
            }
        })

        if(newDatasUser.password) newDatasUser.password = hashPwd(newDatasUser.password)

        const updatedUser = {...userForId, ...newDatasUser}

        const newAllUsers = allUsers.map(user => {
            if(user.id === userId) {
                return updatedUser
            } else {
                return user
            }
        })

        writeFileSync(this.file, JSON.stringify(newAllUsers))

        return {
            success: 'User updated successfully'
        }
        
    }

    login (data) {
        const existUser = JSON.parse(readFileSync(this.file)).find(user => user.email === data.email)

        if(!existUser) {
            this.error.status = 404
            this.error.message = ['Authentication invalid']
            console.log('thisError', this.error)
            return {
                error: this.error
            }
        }

        const verifyPassword = existUser.password === hashPwd(data.password)

        if(!verifyPassword) {
            this.error.status = 422
            this.error.message = ['Authentication invalid']
            return {
                error: this.error
            }
        }

        this.#deleteToken(existUser.id)

        delete existUser.password
        const valueToken = generateToken(existUser)
        
        const newToken = {
            id: randomUUID(),
            userId: existUser.id,
            value: valueToken
        }
        const allTokens = JSON.parse(readFileSync(this.fileToken))
        allTokens.push(newToken)
        writeFileSync(this.fileToken, JSON.stringify(allTokens))

        return {
            user: existUser,
            token: valueToken
        }
    }

    logout (userId, valueToken) {
        console.log(userId, valueToken)
        const newDatasTokens = JSON.parse(readFileSync(this.fileToken)).filter(token => {
            if(token.userId !== userId || token.value !== valueToken) {
                return token
            }
        })

        writeFileSync(this.fileToken, JSON.stringify(newDatasTokens))
        
    }

    #deleteToken (userId) {
        const newDatasTokens = JSON.parse(readFileSync(this.fileToken)).filter(token => {
            if(token.userId !== userId) {
                return token
            }
        })

        writeFileSync(this.fileToken, JSON.stringify(newDatasTokens))

    }   
}

export {
    UserRepository
}

// const userRepository = new UserRepository({
//     file: join(__dirname, '../../database', 'users.json'),
//     fileToken: join(__dirname, '../../database', 'tokens.json')
// })
// console.log(userRepository.logout(
//     'asddfhdhfhdgfhdf', 
//     'asddfhdhfhdgfhdf_7c406986-eb3b-466a-8ceb-596cb29d545f'
// ))
// console.log(userRepository.login({
//     email: 'diego@gmail.com',
//     password: 'Diego@123'
// }))
// console.log(userRepository.create({
//     id: 'dfdsdfdsfsdfsdysfg',
//     name: 'Alex',
//     email: 'Alex@gmail.com',
//     password: 'Alex@123'
// }))
// console.log(userRepository.update('dfdsdfdsfsdfsdysfg', {
//     name: 'Alex Cruz',
//     password: 'Alex@12345'
// }))


// asddfhdhfhdgfhdf
// dfdsdfdsfsdfsdysfg