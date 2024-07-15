'use client'
import { useState, createContext, useRef } from "react";

export type TableRefContextType = {
    MobileTableRef: React.MutableRefObject<HTMLTableElement | null>,
    DesktopTableRef: React.MutableRefObject<HTMLTableElement | null>,
}
export const TableRefContext = createContext<TableRefContextType|null>(null)

export const TableRefContextProvider = ({children}:{children:React.ReactNode}) => {
    const MobileTableRef = useRef<HTMLTableElement|null>(null)
    const DesktopTableRef = useRef<HTMLTableElement|null>(null)

    return (
        <TableRefContext.Provider value={{MobileTableRef,DesktopTableRef}}>
            {children}
        </TableRefContext.Provider>
    )
}
