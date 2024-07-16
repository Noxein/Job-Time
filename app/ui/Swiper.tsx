'use client'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SideNavContext } from '../context/SideNavContext'
import useWindowDimensions from './useWidth'
import { TableRefContext } from '../context/PhoneTableRefContext'

export const Swiper = ({children}:{children?:React.ReactNode}) => {
  const tableRef = useContext(TableRefContext)
    const[startX,setPosStart] = useState<number>()
    const{ height,width } = useWindowDimensions()

    const sideNavContext = useContext(SideNavContext)
    const { setIsOpen } = sideNavContext!

const onSwipe = useCallback(({ deltaX }:{ deltaX:number }) => {
    if (deltaX > width-200) {
      setIsOpen(true)
    } else if(deltaX < -width+200){
      setIsOpen(false)
    }
  }, [])

const handleTouchStart = useCallback((e:TouchEvent) => {
  //if user start swap on the table, then menu wont show
    if(tableRef?.MobileTableRef.current?.contains(e.target as Node)) return
    
    
    setPosStart(Math.floor(e.touches[0].clientX))
  }, [])

const handleTouchEnd = useCallback(
    (e:TouchEvent) => {
        const endX = e.changedTouches[0].clientX
        const deltaX = endX - startX!
        
        onSwipe({ deltaX })
    }, [startX, onSwipe])   

   useEffect(() => {
    if(width >= 768){
      return setIsOpen(true)
    }
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
        window.removeEventListener("touchstart", handleTouchStart, false)
        window.removeEventListener("touchend", handleTouchEnd, false)
    }
  }, [handleTouchStart, handleTouchEnd, width])

  return <></>
}
