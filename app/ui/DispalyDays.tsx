'use client'
import React, { useContext, useRef } from 'react'
import { DisaplyDay } from './DisaplyDay'
import { DisplayDaysHead } from './DisplayDaysHead'
import { DayType } from '../lib/types'
import { DispalyDayOnPhone } from './DispalyDayOnPhone'
import { DispalyDayOnPhoneWithData } from './DispalyDayOnPhoneWithData'
import { TableRefContext } from '../context/PhoneTableRefContext'
import { MoblieTableConcept } from './MoblieTableConcept'
import { OneIndex } from './LoadingSkeletons/DisplayDaysMobile'



export const DispalyDays = ({days,setIdToRemove,showDownloadBtn=false}:{days?:DayType[],setIdToRemove?:React.Dispatch<React.SetStateAction<string[]>>,showDownloadBtn?:boolean}) => {
  const tableRef = useContext(TableRefContext)
  const buttonRef = useRef<HTMLButtonElement|null>(null)

  async function PrintPage(){
    const nav = document.querySelector('nav')
    const printButton = buttonRef.current
    const MobileTableRef = tableRef?.MobileTableRef.current
    const DesktopTableRef = tableRef?.DesktopTableRef.current

    MobileTableRef?.classList.add('hidden')
    DesktopTableRef?.classList.remove('hidden')
    
    nav?.classList.add('hidden')
    printButton?.classList.add('hidden')
  
    window.print()

    MobileTableRef?.classList.remove('hidden')
    DesktopTableRef?.classList.add('hidden')

    nav?.classList.remove('hidden')
    printButton?.classList.remove('hidden')
  
  }

  return (
    <>
    <table className=' hidden lg:block max-w-7xl mx-auto printTable mt-10' ref={tableRef?.DesktopTableRef}>
      <DisplayDaysHead />
      {days && days.map((day,index)=>(<DisaplyDay key={day.id} day={day} index={index}/>))}
     
    </table>
  
    <table className='flex lg:hidden overflow-x-auto whitespace-nowrap w-svw mt-6 phone-table mx-auto' ref={tableRef?.MobileTableRef}>
      <DispalyDayOnPhone/>
      {days && days.map((day,index)=>(<DispalyDayOnPhoneWithData key={day.id} day={day} index={index}/>))}
    </table>
    
    <div className='flex justify-center mt-10'>
      {showDownloadBtn && <button onClick={()=>{PrintPage()}} ref={buttonRef} className='p-4 hover:border-blue-100 rounded-xl border-blue-400 border-4 ' >Pobierz tabele</button>}
    </div>
   
    
    </>
  )
}