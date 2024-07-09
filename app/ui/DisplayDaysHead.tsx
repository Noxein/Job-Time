import React from 'react'

export const DisplayDaysHead = () => {
  return (

    <thead>
        <tr className='grid grid-cols-[1fr_3fr_repeat(4,4fr)_2fr_2fr_2fr]'>
            <BDiv>Lp</BDiv>
            <BDiv>Data</BDiv>
            <BDiv>Godz. rozpoczecia pracy</BDiv>
            <BDiv>Godz. zakończneia pracy</BDiv>
            <BDiv>Ilość godzin pracy</BDiv>
            <BDiv>Miesjce pracy</BDiv>
            <BDiv>Ilośc litrów</BDiv>
            <BDiv>Stan licznika</BDiv>
            <BDiv additionalClasses='min-w-24'>Podpis operatora</BDiv>
        </tr>
    </thead>
    

  )
}

const BDiv = ({children,additionalClasses,...rest}:{children:React.ReactNode,additionalClasses?:string}&React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>) =>{
    return(
        <th className={`border-2 px-2 flex items-center justify-center ${additionalClasses}`} {...rest}>
            {children}
        </th>
    )
}