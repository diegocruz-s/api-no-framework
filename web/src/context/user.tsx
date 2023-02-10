import { createContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

type PropsAuthContext = {
    children: React.ReactNode
}

type User = {
    name?: string
    email?: string
    password?: string
}

type UserStorage = {
    id: string
    name: string
    email: string
    token: string
}

type Error = {
    message: string
    code: string
    status: string | number
}

type ContentAuthContext = {
    abc: string,
    user: UserStorage | null
    auth: boolean
    loading: boolean
    error: Error | null
    success: string
    create: (user: User) => void
    login: (user: User) => void
    logout: () => void
    update: (user: User) => void
}

export const AuthContext = createContext<ContentAuthContext | null>(null)

export function AuthContextProvider ({ children }: PropsAuthContext) {

    const [user, setUser] = useState<UserStorage | null>(null)
    const [auth, setAuth] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const [success, setSuccess] = useState<string>('')

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem('userStorage') || '{}')
        if(userStorage.user) return setUser(userStorage)
            // maybe authorization??
    }, [])

    useEffect(() => {
        if(user) return setAuth(true)
    }, [user])

    const resetStates = () => {
        setLoading(false)
        setError(null)
        setSuccess('')
    }

    const create = async(user: User) => {
        resetStates()
        setLoading(true)
        const res = await api.post('/user', user)
            .then(res => { return res.data })
            .catch(err => { return err.response.data })
        console.log('error', !!res.error)
        if(res.error) {
            console.log('error', res.error)
            setError(res.error)
            setLoading(false)
            return
        }
        setSuccess(res.success)
        
        setLoading(false)

    }

    const login = async(user: User) => {
        resetStates()
        setLoading(true)
        const res = await api.post('/login', user)
            .then(res => { return res.data })
            .catch(err => { return err.response.data })

        console.log('resLogin', res)
        if(res.error) {
            setError(res.error)
            setLoading(false)
            return
        }
        setUser(res)

        localStorage.setItem('userStorage', JSON.stringify(res))
        api.defaults.headers.authorization = `Bearer ${res.token}`

        setLoading(false)
        console.log('login:', user)
    }
    // {user: {…}, token: 'c783410a-429b-48e3-8f98-5501777254f1_ab027b64-5a2b-4567-8deb-c2e3725fbcb8'}
    const logout = async() => {
        console.log('logout')
    }

    const update = async(user: { name?: string, password?: string }) => {
        console.log('update', user)
    }

    const valueContext = {
        abc: 'Diego Cruz\'s',
        user,
        create,
        login,
        logout,
        update,
        auth,
        loading,
        success,
        error
    }

    return (
        <AuthContext.Provider value={valueContext}>
            { children }
        </AuthContext.Provider>
    )

}