'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { SideNavContext } from '../context/SideNavContext'

export default function Sidenav({logoutBtn}:{logoutBtn:React.ReactNode}){
  const hover = 'hover:bg-blue-700 p-2 rounded'
  const sideNavContext = useContext(SideNavContext)
  const { isOpen, setIsOpen } = sideNavContext!

  const OpenNav = isOpen? 'left-0' : '-left-full'
  return (<>
    {!isOpen && <button className='fixed md:hidden' onClick={()=>setIsOpen(x=>!x)}>-=+</button>}
    <nav className={`flex flex-col fixed gap-6 h-dvh ${OpenNav} md:static md:h-16 md:flex-row md:w-screen bg-blue-500 text-white items-center text-l px-6 z-10`} >
      
        <button onClick={()=>setIsOpen(x=>!x)} className='absolute left-0 md:hidden'> +=- </button>
        <Link href={'/home'} className={`${hover} mt-6 md:mt-0`} onClick={()=>setIsOpen(x=>!x)} tabIndex={isOpen?0:-1}>
          Strona Glówna
        </Link>

        <Link href={'/home/szukaj'} tabIndex={isOpen?0:-1}
        className={`${hover}`} onClick={()=>setIsOpen(x=>!x)}>
        Szukaj po dacie
        </Link>

        <Link href={'/home/add'} tabIndex={isOpen?0:-1}
        className={`${hover}`} onClick={()=>setIsOpen(x=>!x)}>
        Dodaj rekord
        </Link>

        <Link href={'/home/remove'} tabIndex={isOpen?0:-1}
        className={`${hover}`} onClick={()=>setIsOpen(x=>!x)}>
        Usuń rekord
        </Link>

       {logoutBtn}
    </nav>
    </>)
}
