'use client'

import { addDay } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import { Input, ErrorDiv } from "@/app/ui/Input"

export default function Add(){
    const initState = {
        errors:{
            zodErrors:{
                date:[],
                start:[],
                end:[],
                workplace:[],
                liters: [],
                counter: [],
            },
            message: '',
        }
    }
    const [state , dispatch] = useFormState(addDay,initState)
    return(
        <form className="flex flex-col text-xl mt-10 w-full px-4 lg:px-24 max-w-2xl mx-auto" action={dispatch}>
            <Input name="date" nazwa="Data" type="date"/>
            <ErrorDiv errorsArr={state?.errors.zodErrors?.date}/>

            <Input name="start" nazwa="Zaczęcie" type="time"/>
            <ErrorDiv errorsArr={state?.errors.zodErrors?.start}/>

            <Input name="end" nazwa="Zakończenie" type="time"/>
            <ErrorDiv errorsArr={state?.errors.zodErrors?.end}/>

            <Input name="workplace" nazwa="Miejsce Pracy" type="text"/>
            <ErrorDiv errorsArr={state?.errors.zodErrors?.workplace}/>

            <div className="border-2 text-center mb-4">
                <span className="py-5">Tankowanie</span>
                <div className="flex flex-col lg:flex-row lg:gap-2 p-2">
                    <div className="flex flex-col flex-1">
                        <Input name="liters" nazwa="Ilość litrów" type="number"/>
                        <ErrorDiv errorsArr={state?.errors.zodErrors?.liters}/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <Input name="counter" nazwa="Stan licznika" type="number"/>
                        <ErrorDiv errorsArr={state?.errors.zodErrors?.counter}/>
                    </div>
                </div>
            </div>
            <button className="border-2 rounded h-12" type="submit">Dodaj</button>
            <ErrorDiv errorsArr={[state?.errors.message!]}/>
        </form>
    )
}