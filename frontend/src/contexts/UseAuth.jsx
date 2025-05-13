import { createContext, useContext, useState, useEffect, } from "react";
import { get_auth, login } from "@/api/endpoints";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const [username, setUsername] = useState('')
    const nav = useNavigate()

    
    const check_auth = async () => {
        try {
            await get_auth()
            setAuth(true)
        } catch (error) {
            setAuth(false)
        } finally {
            setAuthLoading(false)
        }
    }

    const auth_login = async (username, password) => {
        const data = await login(username, password)        
        if (data.success){
            setAuth(true)
            setUsername(username)
            nav(`/${username}`)
        } else {
            alert("Invalid username and password")
        }
    }

    useEffect(()=>{
        check_auth()
    }, [window.location.pathname])

    return(
        <AuthContext.Provider value={{auth, authLoading, auth_login, username}}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)