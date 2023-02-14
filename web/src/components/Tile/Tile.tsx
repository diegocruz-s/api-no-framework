import styles from './Tile.module.css'
import { DotsThree } from 'phosphor-react'
import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

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
    const [hoverTile, setHoverTile] = useState<boolean>(false)
    const [hoverContent, setHoverContent] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    
    console.log('HC', hoverContent)
    console.log('HT', hoverTile)
    const { id, image, name, url } = tile
    return (
        <div className={styles.content}>
            
            <div 
                className={styles.tile}
                onMouseEnter={() => setHoverTile(true)}
                onMouseLeave={() => setHoverTile(false)}
            >
                <a href={url} target="_blank">
                    <img src={image} className={styles.image} alt={name} />
                </a>
                
                <Popover.Root>
                    <Popover.Trigger asChild className={styles.optionsTile}>
                        <p>...</p>
                    </Popover.Trigger>

                    <Popover.Portal>
                        <Popover.Content 
                            className={styles.contentPopover}
                            style={{ display: hoverTile ? 'flex' : 'none' }}
                            onMouseEnter={() => setHoverContent(true)}
                            onMouseLeave={() => setHoverContent(false)}
                        >
                            <button onClick={() => console.log(`Delete ${tile.id}`)}>Delete Tile</button>
                            <button onClick={() => console.log(`Edit ${tile.id}`)}>Edit Tile</button>
                        </Popover.Content>

                    </Popover.Portal>
                </Popover.Root>
                
            </div>

            <div className={styles.nameTile}>
                <p>
                    {name}
                </p>
            </div>
            
        </div>
        
    )
}