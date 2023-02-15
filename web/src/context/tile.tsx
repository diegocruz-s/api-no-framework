import { createContext, useState } from "react";
import { api } from "../utils/axios";

type PropsTileContext = {
    children: React.ReactNode
}

type Tiles = {
    id: string
    name: string
    image: string
    url: string
    userId: string
}
type TileUpdateAndCreate = {
    name?: string
    image?: string
    url?: string
}

type ContentTileContext = {
    getTiles: () => void
    updateTile: (id: string, datas: TileUpdateAndCreate) => void
    createTile: (datas: TileUpdateAndCreate) => void
    deleteTile: (id: string) => void
    tiles: Tiles[]
    loading: boolean
    error: Error | null
    success: string
}

export const TileContext = createContext<ContentTileContext | null>(null)

export function TileContextProvider ({ children }: PropsTileContext) {

    const [tiles, setTiles] = useState<Tiles[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const [success, setSuccess] = useState<string>('')

    const resetStates = () => {
        setLoading(false)
        setError(null)
        setSuccess('')
    }

    const getTiles = async () => {
        resetStates()
        setLoading(true)
        const res = await api.get('/tile')
            .then(res => { return res.data.tiles })
            .catch(err => { return err.response.data })
        setTiles(res)
        setLoading(false)
    }

    const updateTile = async (id: string, datas: TileUpdateAndCreate) => {
        resetStates()
        setLoading(true)
        const res = await api.patch(`/tile/${id}`, datas)
            .then(res => { return res.data })
            .catch(err => { return err.response.data })
        if(res.error) {
            setError(res.error[0])
            setLoading(false)
            return
        }

        const newTiles = tiles.map(tile => {
            if(tile.id === id) {
                return res.tile
            } else {
                return tile
            }
        })

        setTiles(newTiles)
        setSuccess(res.success)
        setLoading(false)
    }

    const createTile = async (datas: TileUpdateAndCreate) => {
        resetStates()
        setLoading(true)
        const res = await api.post('/tile', datas)
            .then(res => { return res.data })
            .catch(err => { return err.response.data })
        if(res.error) {
            setError(res.error[0])
            setLoading(false)
            return
        }

        const newTiles = [...tiles, res.tile]

        setTiles(newTiles)
        setSuccess(res.success)
        setLoading(false)

    }

    const deleteTile = async (id: string) => {
        resetStates()
        setLoading(true)

        const res = await api.delete(`/tile/${id}`)
            .then(res => { return res.data })
            .catch(err => { return err.response.data })
        if(res.error) {
            setError(res.error)
            setLoading(false)
            return
        }

        const newTiles = tiles.filter(tile => tile.id !== id)

        setTiles(newTiles)
        setLoading(false)
        setSuccess(res.success)
    }

    const valueContext: ContentTileContext = {
        getTiles,
        loading,
        error,
        success,
        tiles,
        updateTile,
        createTile,
        deleteTile
    }

    return (
        <TileContext.Provider value={valueContext}>
            { children }
        </TileContext.Provider>
    )

}