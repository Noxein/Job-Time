'use client'
import Link from 'next/link'
import React, { useContext, useRef, useState } from 'react'
import { SideNavContext } from '../context/SideNavContext'
import useWindowDimensions from './useWidth'

export default function Sidenav({logoutBtn}:{logoutBtn:React.ReactNode}){
  const hover = 'hover:bg-blue-700 p-2 rounded'
  const style = 'bg-blue-600 w-full text-center border-blue-50 box-border lg:w-max'
  const sideNavContext = useContext(SideNavContext)
  const { isOpen, setIsOpen, sideNavRef } = sideNavContext!
  const{ width } = useWindowDimensions()

  function ClickNavbarLinkOnMobile(){
    if(width>768) return
    setIsOpen(false)
  }
  const OpenOrCloseSideNavBtnFunc = (type:string) => {
    
    if(type==='open'&&sideNavRef.current){
      setIsOpen(true)
      sideNavRef.current.style.transform = `translateX(${0})`
    }
    if(type==='close'&&sideNavRef.current){
      setIsOpen(false)
      sideNavRef.current.style.transform = `translateX(${-100}%)`
    }
  }

  return (<>
    {!isOpen && <button className='fixed md:hidden' onClick={()=>OpenOrCloseSideNavBtnFunc('open')}><MenuIcon/></button>}
    <nav className={`lg:px-24 flex flex-col fixed gap-6 h-dvh md:static md:h-16 md:flex-row md:w-screen bg-blue-500 text-white items-center text-l px-6 z-10 sideNavTransition`} ref={sideNavRef}>
      
        <button onClick={()=>OpenOrCloseSideNavBtnFunc('close')} className='absolute right-2 md:hidden'> <ArrowLeft/> </button>
        <Link href={'/home'} className={`${hover} mt-10 md:mt-0 ${style}`} tabIndex={isOpen?0:-1} onClick={ClickNavbarLinkOnMobile}>
          Strona Glówna
        </Link>

        <Link href={'/home/szukaj'} tabIndex={isOpen?0:-1}
        className={`${hover} ${style}`} onClick={ClickNavbarLinkOnMobile}>
        Szukaj po dacie
        </Link>

        <Link href={'/home/add'} tabIndex={isOpen?0:-1}
        className={`${hover} ${style}`} onClick={ClickNavbarLinkOnMobile}>
        Dodaj rekord
        </Link>

        <Link href={'/home/remove'} tabIndex={isOpen?0:-1}
        className={`${hover} ${style}`} onClick={ClickNavbarLinkOnMobile}>
        Usuń rekord
        </Link>

       {logoutBtn}
    </nav>
    </>)
}

const MenuIcon = () => {
//   return (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" className='pt-1 pl-1'>
// <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
// </svg>)

return(<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" className='pt-1 pl-1'>
<path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
</svg>)
}

const ArrowLeft = () => {
   return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className='pt-1 pl-1 text-white' viewBox="0 0 448 512"><path fill='#fff' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
   )
}