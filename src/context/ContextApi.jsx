import React, { useState, createContext } from 'react'


export const addResponseContext = createContext()

function ContextApi({ children }) {
    const [addResponse, setAddResponse] = useState()

    return (
        <>
            <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
                {children}
            </addResponseContext.Provider>
        </>
    )
}

export default ContextApi