import { QueryResultRow } from '@vercel/postgres';
import React from 'react'
import { ErrorDiv, Input } from './Input';

type state= {
    error: string;
    data?: undefined;
} | {
    data: QueryResultRow[];
    error?: undefined;
}

export const SearchInputs = ({dispatch,state}:{dispatch: (payload: FormData) => void,state:state}) => {
  return (
    <form action={dispatch} className='flex flex-col mt-10 px-10 mx-auto max-w-2xl w-full'>
        <Input name="from" nazwa="Od" type="date"/>

        <Input name="to" nazwa="Do" type="date"/>

        <ErrorDiv errorsArr={[state?.error!]}/>
        
        <button type='submit' className='border-2 py-2 rounded'>
            Szukaj
        </button>
    </form>
  )
}
