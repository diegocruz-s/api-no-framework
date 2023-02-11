import { createContext, useEffect, useState } from "react";
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

type ContentTileContext = {
    qualquerCoisa: string
    getTiles: () => void
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

    const valueContext = {
        qualquerCoisa: 'Qualquer coisa',
        getTiles,
        loading,
        error,
        success,
        tiles
    }

    return (
        <TileContext.Provider value={valueContext}>
            { children }
        </TileContext.Provider>
    )

}