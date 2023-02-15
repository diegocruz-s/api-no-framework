import styles from './Tile.module.css'
import { useContext, useEffect, useState } from 'react';
import { FormEditCreate } from '../FormEditCreate/FormEditCreate';
import { TileContext } from '../../context/tile';

type TileProps = {
  tile: {
    id: string,
    name: string,
    image: string,
    url: string,
    userId: string
  }
}

export function Tile({ tile }: TileProps) {
  const [hoverTile, setHoverTile] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [formEdit, setFormEdit] = useState<boolean>(false)
  const { deleteTile } = useContext(TileContext)!

  const handleDelete = async (id: string) => {
    await deleteTile(id)
  }

  useEffect(() => {
    setHoverTile(false)
    setIsOpen(false)
  }, [formEdit])

  const { id, image, name, url } = tile
  return (
    <div
      className={styles.content}
      onMouseEnter={() => {
        setHoverTile(true);
      }}
      onMouseLeave={() => {
        setHoverTile(false)
        setIsOpen(false)
      }}
    >
      <div
        className={`${styles.tile}`}
      >
        <a href={url} target="_blank">
          <img src={image} className={styles.image} alt={name} />
        </a>

        
          {hoverTile && (
              <div className={styles.optionsTile} onClick={() => setIsOpen(!isOpen)}>
                <p>...</p>
              </div>
          )}

          {(isOpen && hoverTile) && (
            <div className={styles.contentPopover}>
              <button onClick={() => handleDelete(tile.id)}>
                Delete Tile
              </button>
              <button onClick={() => {
                setFormEdit(true)
                setHoverTile(false)
              }}>
                Edit Tile
              </button>
            </div>
          )}
         
        
      </div>

      {formEdit && (
        <FormEditCreate formEdit={formEdit} setFormEdit={setFormEdit} tile={tile} />
      )}

      <div className={styles.nameTile}>
        {hoverTile && <p>{name}</p>}
      </div>
    </div>
  );
}
