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
    const { setIsOpen, sideNavRef } = sideNavContext!

const onSwipe = useCallback(({ deltaX }:{ deltaX:number }) => {
    if (deltaX > width-200) {
      if(sideNavRef.current){
        sideNavRef.current.style.transform = `translateX(${0})`
      }
      setIsOpen(true)
      return
    } else if(deltaX < -width+200){
      if(sideNavRef.current){
        sideNavRef.current.style.transform = `translateX(${-100}%)`
      }
      setIsOpen(false)
      return
    }
    if(sideNavRef.current){
      sideNavRef.current.style.transform = `translateX(${-100}%)`
    }
    setIsOpen(false)
  }, [])

const handleTouchStart = (e:TouchEvent) => {
  //if user start swap on the table, then menu wont show
    if(tableRef?.MobileTableRef.current?.contains(e.target as Node)) return
    console.log('touchstart',e)
    
    setPosStart(e.touches[0].pageX)
  }

const handleTouchMove = useCallback((e:TouchEvent)=>{
  if(tableRef?.MobileTableRef.current?.contains(e.target as Node)) return
  if(sideNavRef.current){
    let currentCursorPos = e.touches[0].clientX
    const maxSlideDistance = width-200
    // let slide = (maxSlideDistance-((Math.floor(startX!)-Math.floor(currentCursorPos))))/100
    let slide = ((startX! - (currentCursorPos-startX!))* -1)
    console.log(slide)
    if(slide>0) return
    sideNavRef.current.style.transform = `translateX(${slide}%)`
  }
},[startX])

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
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
        window.removeEventListener("touchstart", handleTouchStart, false)
        window.removeEventListener("touchend", handleTouchEnd, false)
        window.removeEventListener("touchmove", handleTouchMove, false)
    }
  }, [handleTouchStart, handleTouchEnd, handleTouchMove, width])

  return <></>
}
