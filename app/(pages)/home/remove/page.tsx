'use client'
import { useFormState } from 'react-dom'
import { RemoveMultipleIds, searchByDate } from '@/app/lib/actions'
import { SearchInputs } from '@/app/ui/SearchInputs'
import { DispalyDays } from '@/app/ui/DispalyDays'
import { useContext } from 'react'
import { RemoveIndexesContext } from '@/app/context/RemoveIndexes'
export default function RemoveIndex(){
    const initialState = {
        error: ''
    }
    const removeIndexesContext = useContext(RemoveIndexesContext)
    const[state,dispatch] = useFormState(searchByDate,initialState)

    const RemoveItems = RemoveMultipleIds.bind(null,removeIndexesContext?.idsToRemove!)
    const[deletionState,dispatchState] = useFormState(RemoveItems,{error: ''})
    
    return(
        <div className="w-full text-xl">
            <div>
                <SearchInputs dispatch={dispatch} state={state}/>
            </div>
            {state.data && 
            <div>
                <DispalyDays days={state.data} />
            </div>
            }
            {state.data && 
                <form className='flex justify-center mt-0' action={dispatchState}>
                    <button type='submit' id='printButton' className='p-4 border-2 hover:border-neutral-800 rounded-xl' >Usuń zaznaczone</button>
                </form>
            }
           <div className='text-red-500 text-center'> {deletionState.error} </div>
        </div>
    )
}