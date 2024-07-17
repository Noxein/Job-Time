'use client'
import { createContext, useRef, useState } from "react";
import { isOpenType } from "../lib/types";

export const SideNavContext = createContext<isOpenType|null>(null)

export const SideNavContextProvider = ({children}:{children:React.ReactNode}) => {
    const[isOpen, setIsOpen] = useState(false)
    const sideNavRef = useRef<HTMLElement|null>(null)
    return(
        <SideNavContext.Provider value={{isOpen,setIsOpen,sideNavRef}}>
            {children}
        </SideNavContext.Provider>
    )
}