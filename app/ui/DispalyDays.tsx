'use client'
import React, { useContext, useRef } from 'react'
import { DisaplyDay } from './DisaplyDay'
import { DisplayDaysHead } from './DisplayDaysHead'
import { DayType } from '../lib/types'
import { DispalyDayOnPhone } from './DispalyDayOnPhone'
import { DispalyDayOnPhoneWithData } from './DispalyDayOnPhoneWithData'
import { TableRefContext } from '../context/PhoneTableRefContext'

export async function PrintPage(){
  const nav = document.querySelector('nav')
  const printButton = document.querySelector('#printButton')
  
  nav?.classList.add('hidden')
  printButton?.classList.add('hidden')

  window.print()
  nav?.classList.remove('hidden')
  printButton?.classList.remove('hidden')

}

export const DispalyDays = ({days,setIdToRemove,showDownloadBtn=false}:{days:DayType[],setIdToRemove?:React.Dispatch<React.SetStateAction<string[]>>,showDownloadBtn?:boolean}) => {
  const tableRef = useContext(TableRefContext)

  return (
    <>
    <table className=' hidden lg:block justify-center max-w-7xl mx-auto' >
      <DisplayDaysHead />
      {days.map((day,index)=>(<DisaplyDay key={day.id} day={day} index={index}/>))}
     
    </table>
    <table className='flex lg:hidden overflow-x-auto whitespace-nowrap w-svw mt-6 phone-table' ref={tableRef?.tableRef}>
      <DispalyDayOnPhone/>
      {days.map((day,index)=>(<DispalyDayOnPhoneWithData key={day.id} day={day} index={index}/>))}
    </table>
    
    <div className='flex justify-center mt-10'>
      {showDownloadBtn && <button onClick={()=>{PrintPage()}} id='printButton' className='p-4 border-2 hover:border-neutral-800 rounded-xl' >Pobierz tabele</button>}
    </div>
   
    
    </>
  )
}