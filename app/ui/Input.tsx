import React from 'react'

export const Input = ({nazwa,name,type,...rest}:{nazwa:string,name:string,type:string}&React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return(
        <div className='w-full flex flex-col'>  
            <label htmlFor={name}>{nazwa}</label>
            <input type={type} id={name} name={name} className="border-2 rounded h-12 w-full hover:border-blue-300 border-zinc-300 bg-zinc-100" {...rest}/>
        </div>
    )
}

export const ErrorDiv = ({errorsArr}:{errorsArr:string[] | undefined}) => {
    return(
        <div className="text-red-500 mb-4 text-left">
            {errorsArr && errorsArr.map((err,index)=>(
                <div key={index}>{err}</div>
            ))}
        </div>
    )
}