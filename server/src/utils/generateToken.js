import { randomUUID } from 'node:crypto'

export const generateToken = (user) => {
    const token = user.id + '_' + randomUUID()

    return token
}