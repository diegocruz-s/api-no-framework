import { useEffect, useState } from 'react'
import styles from './Message.module.css'

type MessageProps = {
    type: string
    message: string
}

export function Message ({ message, type } : MessageProps) {
    const [showMessage, setShowMessage] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setShowMessage(false)
        }, 2000)
    }, [])

    return (
        <div className="message">
            {showMessage && (
                <h3
                    className={styles[type]}
                >{message}</h3>
            )}
        </div>
    )
}