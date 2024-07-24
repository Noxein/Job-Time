'use client'
import React, { useEffect, useState } from 'react'
import { checkIfIsWorking, StartWork } from '../lib/actions'
import { LoadingLogo } from './LoadingLogo'
import { EndWorkFormModal } from './EndWorkForm'

export const StartWorkBtn = () => {
    const[isLoading,setIsLoading] = useState(true)
    const[isWorking,setIsWorking] = useState(false)
    const[showEndWorkModal,setShowEndWorkModal] = useState(false)

    const StartWorkBtnClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        StartWork();
        setIsWorking(true);
    }
    
    const EndWorkBtnClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShowEndWorkModal(true)
    }
    useEffect(()=>{
        const fetcisWorking = async () => {
            const result = await checkIfIsWorking()
            setIsWorking(result)
            setIsLoading(false)
        }
        fetcisWorking()
    },[])

    if(isLoading) return null

    if(!isWorking) return (
    <form className='flex justify-center my-10 '>
         <button className='bg-blue-500 px-4 py-4 text-white text-3xl' onClick={e=>{StartWorkBtnClick(e)}}>Zacznij prace</button>
    </form>
    )

  return (<>
    <form className='flex justify-center my-10 '>
        <button className='bg-blue-500 px-4 py-4 text-white text-3xl' onClick={(e)=>{EndWorkBtnClick(e)}}>Zakończ prace</button> 
    </form>
    {isWorking&&showEndWorkModal&&<EndWorkFormModal setShowEndWorkModal={setShowEndWorkModal} setIsWorking={setIsWorking}/>}
  </>)
}
