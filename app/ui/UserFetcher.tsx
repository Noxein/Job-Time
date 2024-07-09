import React from 'react'
import { getUser } from '../lib/actions'
import { UserContextProvider } from '../context/userContext'

export const UserFetcher = async ({children}:{children:React.ReactNode}) => {
    const user = await getUser()
  return (
    <UserContextProvider user={user}>
      {children}
      </UserContextProvider>
  )
}
