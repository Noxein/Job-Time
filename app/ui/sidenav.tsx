'use client'
import { auth, signOut } from '@/auth'
import Link from 'next/link'
import React, { useState } from 'react'
import { LogoutBtn } from './LogoutBtn'

export default function Sidenav({logoutBtn}:{logoutBtn:React.ReactNode}){
  const hover = 'hover:bg-blue-700 p-2 rounded'
  const[isOpen, setIsOpen] = useState(false)
  const OpenNav = isOpen? 'left-0' : '-left-full'
  return (<>
    {!isOpen && <button className='fixed md:hidden' onClick={()=>setIsOpen(x=>!x)}>-=+</button>}
    <nav className={`flex flex-col fixed gap-6 h-screen ${OpenNav} md:static md:h-16 md:flex-row md:w-screen bg-blue-500 text-white items-center text-l px-6 z-10`} >
      
        <button onClick={()=>setIsOpen(x=>!x)} className='absolute left-0 md:hidden'> +=- </button>
        <Link href={'/home'} className={`${hover} mt-6 md:mt-0`} onClick={()=>setIsOpen(x=>!x)}>
          Strona Glówna
        </Link>

        <Link href={'/home/szukaj'}
        className={`${hover}`} onClick={()=>setIsOpen(x=>!x)}>
        Szukaj po dacie
        </Link>

        <Link href={'/home/add'}
        className={`${hover}`} onClick={()=>setIsOpen(x=>!x)}>
        Dodaj rekord
        </Link>

        <Link href={'/home/remove'}
        className={`${hover}`} onClick={()=>setIsOpen(x=>!x)}>
        Usuń rekord
        </Link>

       {logoutBtn}
    </nav>
    </>)
}
