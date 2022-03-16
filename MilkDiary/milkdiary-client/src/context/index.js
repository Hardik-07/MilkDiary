import { createContext, useContext, useState } from 'react'

export const ActiveLinkContext = createContext()

export const ActiveLinkProvider = ({ children }) => {
    //initial state
    const [activeLink, setActiveLink] = useState('Dashboard')
    const [authenticated, setAuthenticated] = useState(false)
    const [userid, setUserid] = useState('')

    return (
        <ActiveLinkContext.Provider
            value={{
                activeLink,
                setActiveLink,
                authenticated,
                setAuthenticated,
                userid,
                setUserid,
            }}>
            {children}
        </ActiveLinkContext.Provider>
    )
}

export const useActiveLinkValue = () => useContext(ActiveLinkContext)
