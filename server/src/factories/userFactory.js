import { UserRepository } from "../repositories/userRepository.js"
import { UserService } from '../services/userService.js'

import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const generateUserService = () => {
    const userRepository = new UserRepository({
        file: join(__dirname, '../../database', 'users.json'),
        fileToken: join(__dirname, '../../database', 'tokens.json')
    })

    const userService = new UserService({
        repository: userRepository
    })

    return userService
}

export {
    generateUserService
}