'use client'
import { createContext } from "react";
import { contextUserType } from "../lib/types";

export const userContext = createContext<contextUserType|null>(null)

export const UserContextProvider = ({children,user}:{children:React.ReactNode,user:contextUserType|null}) => {

    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}