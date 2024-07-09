'use client'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { RemoveIndexesContext } from '../context/RemoveIndexes'

export const ResetRemoveArr = () => {
    const RemoveContext = useContext(RemoveIndexesContext)
    const { setIdsToRemove } = RemoveContext!
    const pathname = usePathname()
    useEffect(()=>{
      setIdsToRemove([])
    },[pathname,setIdsToRemove])
  return (
    <div></div>
  )
}
