'use client'
import { useFormState } from 'react-dom'
import { RemoveMultipleIds, searchByDate } from '@/app/lib/actions'
import { DispalyDays } from '@/app/ui/DispalyDays'
import { useContext, useState } from 'react'
import { RemoveIndexesContext } from '@/app/context/RemoveIndexes'
import { SubmitButton } from '@/app/ui/PendingBtn'
import { LoadingLogo } from '@/app/ui/LoadingLogo'
import { ErrorDiv, Input } from '@/app/ui/Input'
import { DisplayDaysDesktop as DisplayDaysDesktopSekelton } from '@/app/ui/LoadingSkeletons/DisplayDaysDesktop'
import { LoadingState } from '@/app/lib/LoadingState'
export default function RemoveIndex(){

    const removeIndexesContext = useContext(RemoveIndexesContext)

    const[isLoadingData,setIsLoadingData] = useState<boolean>(false)

    const RemoveItems = RemoveMultipleIds.bind(null,removeIndexesContext?.idsToRemove!)
    const[deletionState,dispatchState] = useFormState(RemoveItems,{error: ''})
    const[searchedItems,dispachSearchItems] = useFormState(searchByDate,{error:''})
    
    return(
        <div className="w-full text-xl px-0 lg:px-24">
            <form className='flex flex-col mt-10 px-10 mx-auto max-w-2xl w-full' action={dispachSearchItems}>
                <Input required name="from" nazwa="Od" type="date"/>

                <Input required name="to" nazwa="Do" type="date"/>

                <ErrorDiv errorsArr={[searchedItems.error!]}/>
                
                
                <button type='submit' className='border-2 py-2 rounded flex gap-1 justify-center items-center min-h-12 border-blue-500 hover:border-blue-300'>
                    {isLoadingData?<LoadingLogo/>:'Szukaj'}
                </button>

                <LoadingState setIsLoading={setIsLoadingData}/>
            </form>
            {isLoadingData?<DisplayDaysDesktopSekelton/>:null}
            {!isLoadingData && searchedItems.data && 
            <>
                <div>
                    <DispalyDays days={searchedItems.data} />
                </div>
                <form className='flex justify-center mt-0' action={dispatchState}>
                    {/* <button type='submit' id='printButton' className='p-4 border-2 hover:border-neutral-800 rounded-xl' >Usuń zaznaczone</button> */}
                    <SubmitButton text={`Usuń zaznaczone (${removeIndexesContext?.idsToRemove.length})`}/>
                </form>
            </>
            }
           <div className='text-red-500 text-center'> {deletionState.error} </div>
        </div>
    )
}