import crypto from 'node:crypto'

export const hashPwd = (pwd) => {
    if(typeof(pwd) === 'string' && pwd.length >= 6) {
        const hash = crypto.createHmac('sha256', 'saf45hdf_sddf09()45765V#$¨T45gvvb345a')
        const update = hash.update(pwd)
        const digest = update.digest('hex')
    
        return digest
    } else {
        return false
    }
    
}