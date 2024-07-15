'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { LoadingLogo } from './LoadingLogo'

export const SubmitButton = ({text}:{text:string}) => {
    const { pending } = useFormStatus()
    if(pending) return (
    <button className="border-2 rounded h-12 flex gap-1 justify-center items-center min-w-64" type="submit" disabled>
        <LoadingLogo />
    </button>
    )
    return  <button className="border-2 rounded h-12 px-4 min-w-64 border-blue-500 hover:border-blue-300" type="submit">{text}</button>
}
