import React from 'react'

export const DispalyDayOnPhone = () => {
  return (
    <thead className='sticky left-0'>
      <tr className='bg-white flex flex-col'>
          <TH>Lp</TH>
          <TH>Data</TH>
          <TH>Od</TH>
          <TH>Do</TH>
          <TH>Suma</TH>
          <TH>Miejsce</TH>
          <TH>Litry</TH>
          <TH>Licznik</TH>
        </tr>
    </thead>
  )
}

const TH = ({children,odd,...rest}:{children:React.ReactNode,odd?:boolean}&React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>) => {
    return(
        <th className={`flex-1 border-2 pr-2  py-4`} {...rest}>{children}</th>
    )
}