'use client'
import { useState, createContext, useRef } from "react";

export type TableRefContextType = {
    tableRef: React.MutableRefObject<HTMLTableElement | null> 
}
export const TableRefContext = createContext<TableRefContextType|null>(null)

export const TableRefContextProvider = ({children}:{children:React.ReactNode}) => {
    const tableRef = useRef<HTMLTableElement|null>(null)

    return (
        <TableRefContext.Provider value={{tableRef}}>
            {children}
        </TableRefContext.Provider>
    )
}
