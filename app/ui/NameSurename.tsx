'use client'
import React, { useContext } from 'react'
import { userContext } from '../context/userContext'

export const NameSurename = () => {
    const user = useContext(userContext)
  return (
    <div>{user?.name} {user?.surename}</div>
  )
}
