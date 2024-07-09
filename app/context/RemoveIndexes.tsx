'use client'
import { useState, createContext } from "react";

export type IndexesContext = {
    idsToRemove:string[],
    setIdsToRemove: React.Dispatch<React.SetStateAction<string[]>>
}
export const RemoveIndexesContext = createContext<IndexesContext|null>(null)

export const RemoveIndexesContextProvider = ({children}:{children:React.ReactNode}) => {
    const [idsToRemove,setIdsToRemove] = useState<string[]>([])

    return (
        <RemoveIndexesContext.Provider value={{idsToRemove,setIdsToRemove}}>
            {children}
        </RemoveIndexesContext.Provider>
    )
}
