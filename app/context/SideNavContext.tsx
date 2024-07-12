'use client'
import { createContext, useState } from "react";
import { isOpenType } from "../lib/types";

export const SideNavContext = createContext<isOpenType|null>(null)

export const SideNavContextProvider = ({children}:{children:React.ReactNode}) => {
    const[isOpen, setIsOpen] = useState(false)
    console.log(isOpen)
    return(
        <SideNavContext.Provider value={{isOpen,setIsOpen}}>
            {children}
        </SideNavContext.Provider>
    )
}