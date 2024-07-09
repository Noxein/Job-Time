import React, { useContext, useEffect } from 'react'
import { AddOrRemoveIds, useBgColorClass } from '../lib/utils'
import { format } from 'date-fns'
import { DayType } from '../lib/types'
import { CountHours } from '../lib/utils'
import { RemoveIndexesContext } from '../context/RemoveIndexes'
import { usePathname } from 'next/navigation'

export const DisaplyDay = ({day,index}:{day:DayType,index: number}) => {
  const data = format(day.day,'dd-MM-yyyy')
  const pathname = usePathname()
  const RemoveContext = useContext(RemoveIndexesContext)
  const { idsToRemove, setIdsToRemove } = RemoveContext!
  let styles = useBgColorClass(index,day.id,idsToRemove)

  const AddOrRemoveIndexes = () => { 
    if(pathname.includes('remove')) AddOrRemoveIds(day.id,idsToRemove,setIdsToRemove)
  }
  return (
    <tbody>
      <tr className={`grid grid-cols-[1fr_3fr_repeat(4,4fr)_2fr_2fr_2fr] ${styles} `} 
      onClick={()=>AddOrRemoveIndexes()}>
        <th className={`border-2 px-2 flex items-center justify-center min-w-9 `}>{index+1}</th>
        <BDiv>{data}</BDiv>
        <BDiv>{day.starthour.slice(0,5)}</BDiv>
        <BDiv>{day.endhour.slice(0,5)}</BDiv>
        <BDiv>{CountHours(day.starthour,day.endhour)}</BDiv>
        <BDiv className='border-2 px-2 flex items-center justify-start'>{day.workplace}</BDiv> 
        <BDiv className='flex-1 border-2'>{day.liters}</BDiv>
        <BDiv className='flex-1 border-2'>{day.counterreading}</BDiv>
        <BDiv className='min-w-24 border-2'> </BDiv>
      </tr>
    </tbody>
  )
}

const BDiv = ({children,classes,...rest}:{children:React.ReactNode,classes?:string}&React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableDataCellElement>, HTMLTableHeaderCellElement>) =>{
  return(
      <td className={`border-2 px-2 flex items-center justify-center ${classes}`} {...rest}>
          {children}
      </td>
  )
}