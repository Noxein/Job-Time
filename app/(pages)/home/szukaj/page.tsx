'use client'
import { searchByDate } from "@/app/lib/actions";
import { LoadingState } from "@/app/lib/LoadingState";
import { DispalyDays } from "@/app/ui/DispalyDays";
import { ErrorDiv, Input } from "@/app/ui/Input";
import { LoadingLogo } from "@/app/ui/LoadingLogo";
import {  DisplayDaysDesktop as DisplayDaysDesktopSkeleton} from "@/app/ui/LoadingSkeletons/DisplayDaysDesktop";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function Szukaj(){
    const[isLoading,setIsLoading] = useState<boolean>(false)
    const[state,dispach] = useFormState(searchByDate,{error:''})
    return(
        <div className="w-full text-xl">
            <form className='flex flex-col mt-10 px-10 mx-auto max-w-2xl w-full' action={dispach}>
                <Input required name="from" nazwa="Od" type="date"/>

                <Input required name="to" nazwa="Do" type="date"/>

                <ErrorDiv errorsArr={[state.error!]}/>
                
                <button type='submit' className='border-2 py-2 rounded flex gap-1 justify-center items-center min-h-12 border-blue-500 hover:border-blue-300'>
                    {isLoading?<LoadingLogo/>:'Szukaj'}
                </button>
                <LoadingState setIsLoading={setIsLoading}/>
            </form>

            {isLoading && <DisplayDaysDesktopSkeleton />}

            {!isLoading && state.data && 
            <div>
                <DispalyDays days={state.data} />
            </div>
            }
        </div>
    )
}