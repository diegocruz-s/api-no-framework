import styles from './Auth.module.css'
import { FormEvent, useContext, useState } from "react"
import { EnvelopeSimple, EyeClosed, Eye, Newspaper, Password } from 'phosphor-react'
import { AuthContext } from '../../context/user'
import { Message } from '../../components/Message/Message'

type PropsAuth = {
    formLogin: boolean
}

type DatasProps = {
    email: string
    password: string
    name?: string
}

export function Auth ({ formLogin }: PropsAuth) {
    const { login, create, loading, success, error } = useContext(AuthContext)!
    const [datas, setDatas] = useState<DatasProps>({
        email: '',
        password: '',
        name: ''
    })
    const [typePass, setTypePass] = useState<boolean>(true)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!datas.email || !datas.password) return
        
        if(formLogin) return login({ email: datas.email, password: datas.password })
        else return create(datas)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDatas(prev => { 
            return {...prev, [name]: value}
        })
    }

    return (
        <div className={styles.componentForm}>
            <form onSubmit={handleSubmit}>
                {!formLogin && 
                    <div className={styles.elementForm}>
                        <label htmlFor="name"><Newspaper /></label>
                        <input
                            type="text" 
                            placeholder="Type your name" 
                            onChange={onChange}
                            name="name"
                        />
                    </div>
                }
                <div className={styles.elementForm}>
                    <label htmlFor="email"><EnvelopeSimple /></label>
                    <input
                        type="email" 
                        placeholder="Type your email" 
                        onChange={onChange}
                        name="email"
                    />
                </div>
                <div className={styles.elementForm}>
                    <label htmlFor="password"><Password /></label>
                    <input
                        type={typePass ? 'password' : 'text'}
                        placeholder="Type your password" 
                        onChange={onChange}
                        name="password"
                    />
                    {typePass ? (
                        <EyeClosed cursor='pointer' onClick={() => setTypePass(false)} />
                    ) : (
                        <Eye cursor='pointer' onClick={() => setTypePass(true)} />
                    )}
                        
                </div>

                { success && (
                    <Message message={success} type="success" />
                ) }

                { error && (
                    <Message message={error.message[0]} type="error" />
                ) }

                <div className={styles.sendResetForm}>
                    {loading ? (
                        <button type="submit" disabled>Aguarde...</button>
                    ) : (
                        <button type="submit">Send</button>
                    )}

                    <button type="reset" onClick={() => setDatas({
                        email: '',
                        password: '',
                        name: ''
                    })}>X</button>
                </div>
                

            </form>
        </div>
    )
}