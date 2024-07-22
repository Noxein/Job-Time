'use server'
import { signOut } from '../pages/api/auth/[...nextauth]'
import React, { useState } from 'react'

export const LogoutBtn = async () => {
    const hover = 'hover:bg-blue-700 p-2 rounded'
    
  return (
    <form className={`mt-auto mb-5 md:mt-0 md:mb-0 md:ml-auto w-full lg:w-fit`}
    action={async()=>{'use server';await signOut({redirectTo: '/login'})}}>
      <button type='submit' className={`bg-blue-600 w-full lg:w-auto text-center border-blue-50 box-border py-2 rounded ${hover}`}>Wyloguj</button>
    </form>
  )
}
