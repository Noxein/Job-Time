import React from 'react'

export const InputError = ({errors}:{errors?: string[]}) => {
  return (
    errors&&<div className='text-red-500 flex flex-col'>
        {errors?.map(err=>(
            <span key={err}>{err}</span>
        ))}
    </div>
  )
}
