import styles from './Home.module.css'
import { useContext, useEffect, useState } from "react"
import { TileContext } from "../../context/tile"
import { AuthContext } from "../../context/user"
import { Tile } from '../../components/Tile/Tile'
import { ArrowLineRight } from 'phosphor-react'
import { FormEditCreate } from '../../components/FormEditCreate/FormEditCreate'
import { Message } from '../../components/Message/Message'

export function Home () {
    const { getTiles, tiles, success, error } = useContext(TileContext)!
    const { logout } = useContext(AuthContext)!
    const [formCreate, setFormCreate] = useState<boolean>(false)

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

            {success && (
                <Message message={success} type='success' />
            )}

            {error && (
                <Message message={error.message} type='error' />
            )}

            <div className={styles.allTiles}>
            {(tiles && tiles.length > 0) ? (
                <>
                    {tiles.map(tile => (
                        <Tile tile={tile} key={tile.id} />                                                        
                    ))}
                    <div className={styles.tileAddPage} onClick={() => setFormCreate(true)}>
                        <h3>+ Add page</h3>
                    </div>
                </>
                     
            ) : (
                <div className={styles.tileAddPage} onClick={() => setFormCreate(true)}>
                    <h3>+ Add page</h3>
                </div>
            )}
            </div>

            {formCreate && (
                <FormEditCreate formCreate={formCreate} setFormCreate={setFormCreate} />
            )}
        </div>
    )
}