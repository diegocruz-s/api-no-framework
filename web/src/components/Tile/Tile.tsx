import styles from './Tile.module.css'
import { DotsThree } from 'phosphor-react'

type TileProps = {
    tile: {
        id: string,
        name: string,
        image: string,
        url: string,
        userId: string
    }
}

export function Tile ({ tile }: TileProps) {
    const { id, image, name, url } = tile
    return (
        <div className={styles.content}>
            
            <div className={styles.tile}>
                <a href={url} target="_blank">
                    <img src={image} className={styles.image} alt={name} />
                </a>
                
                <div onClick={() => console.log('Options click')} className={styles.optionsTile}>
                    <p>...</p>
                </div>
            </div>

            <div className={styles.nameTile}>
                <p>
                    {name}
                </p>
            </div>

        </div>
        
    )
}