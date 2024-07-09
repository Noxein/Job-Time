import React from 'react'

export const Input = ({nazwa,name,type}:{nazwa:string,name:string,type:string}) => {
    return(
        <>  
            <label htmlFor={name}>{nazwa}</label>
            <input type={type} id={name} name={name} className="border-2 rounded h-12"/>
        </>
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