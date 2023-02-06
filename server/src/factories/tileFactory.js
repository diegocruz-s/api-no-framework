import { TileRepository } from "../repositories/tileRepository.js"
import { TileService } from "../services/tileService.js"

import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const generateTileService = () => {
    const tileRepository = new TileRepository({
        file: join(__dirname, '../../database', 'tiles.json')
    })
    const tileService = new TileService({
        repository: tileRepository
    })

    return tileService
}

export {
    generateTileService
}