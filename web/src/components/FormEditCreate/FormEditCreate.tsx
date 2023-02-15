import { useContext, FormEvent, useState, useEffect } from 'react'
import { TileContext } from '../../context/tile'
import { Image, CodeSimple, List } from 'phosphor-react'
import styles from './FormEditCreate.module.css'

type FormEditCreateProps = {
    formEdit?: boolean
    formCreate?: boolean
    setFormEdit?: React.Dispatch<React.SetStateAction<boolean>>
    setFormCreate?: React.Dispatch<React.SetStateAction<boolean>>
    tile?: {
        id: string,
        name: string
        image: string
        url: string
        userId: string
    }
}

type TileCreateAndUpdate = {
    name?: string
    url?: string
    image?: string
}

export function FormEditCreate({ 
    formCreate, 
    formEdit, 
    setFormEdit, 
    setFormCreate,
    tile
}: FormEditCreateProps) {
    const { updateTile, createTile, loading } = useContext(TileContext)!
    const resetOptionsForm = () => {
        if(setFormCreate) setFormCreate(false)
        if(setFormEdit) setFormEdit(false)
    }

    const [datasTile, setDatasTile] = useState<TileCreateAndUpdate>({
        image: '',
        name: '',
        url: ''
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDatasTile(prev => { 
            return {...prev, [name]: value}
        })
    }

    useEffect(() => {
        if(tile) {
            setDatasTile({
                image: tile.image,
                name: tile.name,
                url: tile.url
            })
        }
    }, [tile])

    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formEdit && tile){
            await updateTile(tile.id, datasTile)
            resetOptionsForm()
            return
        }

        if(formCreate) {
            const checkDatasCreate = Object.values(datasTile).map((value: string) => {
                if(!value) {
                    return false
                }
            })
            if(checkDatasCreate.includes(false)){
                return
            }
            
            await createTile(datasTile)
            resetOptionsForm()
            return
        }
       
    }

    return (
        <div className={styles.form}>
            {(formCreate || formEdit) && (
                <div className={styles.formEditCreate}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.elementForm}>
                            <label htmlFor="name">{<List />}</label>
                            <input
                                type="text" 
                                placeholder="Type your name" 
                                onChange={onChange}
                                value={datasTile.name}
                                name="name"
                            />
                        </div>
                        <div className={styles.elementForm}>
                            <label htmlFor="image">{<Image />}</label>
                            <input
                                type="text" 
                                placeholder="Type your image" 
                                onChange={onChange}
                                value={datasTile.image}
                                name="image"
                            />
                        </div>
                        <div className={styles.elementForm}>
                            <label htmlFor="url">{<CodeSimple />}</label>
                            <input
                                type="text" 
                                placeholder="Type your url" 
                                onChange={onChange}
                                value={datasTile.url}
                                name="url"
                            />
                        </div>

                        <div className={styles.btnsOptionsForm}>
                            {loading ? (
                                <button type='button' disabled>
                                    Wait...
                                </button>
                            ) : (
                                <button type='submit'>
                                    {formCreate ? ('Create') : ('Update')}
                                </button>
                            )}
                            <button type='button' onClick={resetOptionsForm}>X</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}