'use client'

import { SetStateAction } from "react"
import { useFormStatus } from "react-dom"

export const LoadingState = ({setIsLoading}:{setIsLoading:React.Dispatch<SetStateAction<boolean>>}) => {
  const { pending } = useFormStatus()
  setIsLoading(pending)
    return <></>
}
