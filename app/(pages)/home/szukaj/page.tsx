'use client'
import { searchByDate } from "@/app/lib/actions";
import { DispalyDays } from "@/app/ui/DispalyDays";
import { SearchInputs } from "@/app/ui/SearchInputs";
import { useFormState } from "react-dom";

export default function Szukaj(){
    const initialState = {
        error: ''
    }
    const[state,dispatch] = useFormState(searchByDate,initialState)
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
        </div>
    )
}