import { format } from 'date-fns'
import React, { useContext } from 'react'
import { AddOrRemoveIds, useBgColorClass } from '../lib/utils'
import { DayType } from '../lib/types'
import { CountHours } from '../lib/utils'
import { RemoveIndexesContext } from '../context/RemoveIndexes'
import { usePathname } from 'next/navigation'

export const DispalyDayOnPhoneWithData = ({day,index}:{day:DayType,index:number}) => {
  const RemoveContext = useContext(RemoveIndexesContext)
  const { idsToRemove, setIdsToRemove } = RemoveContext!
  const pathname = usePathname()
  
  const AddOrRemoveIndexes = () => { 
    if(pathname.includes('remove')) AddOrRemoveIds(day.id,idsToRemove,setIdsToRemove)
  }
  return (
    <tbody >
      <tr className={`flex flex-col border-x-1 ${useBgColorClass(index,day.id,idsToRemove)}`} onClick={()=>AddOrRemoveIndexes()}>
        <TD>{index+1}</TD>
        <TD>{format(day.day,'dd-MM-yyyy')}</TD>
        <TD>{day.starthour.slice(0,5)}</TD>
        <TD>{day.endhour.slice(0,5)}</TD>
        <TD>{CountHours(day.starthour,day.endhour)}</TD>
        <TD>{day.workplace}</TD>
        <TD>{day.liters}</TD>
        <TD>{day.counterreading}</TD>
        </tr>
    </tbody>
  )
}


const TD = ({children,odd,...rest}:{children:React.ReactNode,odd?:boolean}&React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>) => {
return(
<td className={`flex-1 border-2 py-4 px-2 pr-10`} {...rest}>{children}</td>
)
}