'use server'
import { signOut } from '../pages/api/auth/[...nextauth]'
import React from 'react'

export const LogoutBtn = async () => {
    const hover = 'hover:bg-blue-700 p-2 rounded'

  return (
    <form className={`mt-auto mb-5 md:mt-0 md:mb-0 md:ml-auto ${hover}`}
    action={async()=>{'use server';await signOut()}}><button type='submit'>Wyloguj</button></form>
  )
}
