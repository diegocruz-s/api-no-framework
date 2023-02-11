import styles from './Home.module.css'
import { useContext, useEffect } from "react"
import { TileContext } from "../../context/tile"
import { AuthContext } from "../../context/user"
import { Tile } from '../../components/Tile/Tile'
import { ArrowLineRight } from 'phosphor-react'

export function Home () {
    const { qualquerCoisa, getTiles, tiles } = useContext(TileContext)!
    const { logout } = useContext(AuthContext)!

    useEffect(() => {
        getTiles()
    }, [])
    return (
        <div className={styles.home}>
            <nav className={styles.navbar}>
                <ArrowLineRight 
                    className={styles.iconLogout} 
                    cursor='pointer' 
                    onClick={logout} 
                    size={34} 
                />
            </nav>

            <div className={styles.allTiles}>
            {(tiles && tiles.length > 0) ? (
                <>
                    {tiles.map(tile => (
                        <Tile tile={tile} key={tile.id} />                                                        
                    ))}
                    <div className={styles.tileAddPage}>
                        <h3>+ Add page</h3>
                    </div>
                </>
                     
            ) : (
                <div className={styles.tileAddPage}>
                    <h3>+ Add page</h3>
                </div>
            )}
            </div>
        </div>
    )
}