'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import { EndWork } from '../lib/actions'
import { Input } from './Input'
import { InputError } from './InputError'

type StateBoolean = React.Dispatch<React.SetStateAction<boolean>>
export const EndWorkFormModal = ({setShowEndWorkModal,setIsWorking}:{setShowEndWorkModal:StateBoolean,setIsWorking:StateBoolean}) => {
    const initState = {
        errors:{
            workplace: [''],
            liters: [''],
            counter: [''],
            defaultError: ''
        }
    }
    const[state,dispach] = useFormState(EndWork,initState)
    if(!state){
        setShowEndWorkModal(x=>!x)
        setIsWorking(false)
    }
    const HideModal = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShowEndWorkModal(x=>!x)
    }
  return (
    <div className='fixed flex justify-center items-center bg-slate-900 bg-opacity-30 z-10 backdrop-blur-sm w-screen h-screen top-0' onClick={()=>setShowEndWorkModal(x=>!x)}>
        <form action={dispach} className='flex flex-col mx-10 text-white bg-blue-500 px-6 py-4 rounded w-3/4 md:max-w-sm text-xl gap-1' onClick={e=>e.stopPropagation()}>
            <Input name='workplace' nazwa='Miejsce pracy' type='text'/>
            <InputError errors={state?.errors.workplace}/>
    
            <Input name='liters' nazwa='Litry' type='number'/>
            <InputError errors={state?.errors.liters}/>
    
            <Input name='counter' nazwa='Licznik' type='number'/>
            <InputError errors={state?.errors.counter}/>
    
            <button className='bg-white text-black mt-6 rounded h-10' type='submit'>Zapisz</button>
            <button className='bg-red-500 text-white mt-2 rounded h-10' onClick={e=>HideModal(e)}>Anuluj</button>
        </form>
    </div>
  )
}
