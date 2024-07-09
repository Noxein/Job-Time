import React from 'react'
import { NameSurename } from './NameSurename'

export const RegularData = () => {
  return (
    <div className='max-w-7xl flex mx-auto mt-10 mb-10'>
        <div className='w-6/12'>
            <p>Renata Kowalczyk Roboty Ziemne</p>
            <p>Anielów 26, 08-460 Sobolew</p>
            <p>NIP 826-192-64-10, REGON 521299369</p>
        </div>
        <div className='w-5/12 flex'>
            <div className='flex flex-col'>
                <b>Karta czasu pracy operatora</b>
                <div className='mt-4'>Kierowca</div>
                <b><NameSurename/></b>
            </div>
            <div className='mt-auto mb-6'>
                Rodzaj pojzdu:
            </div>
        </div>
    </div>
  )
}
