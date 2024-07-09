'use client'
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Login(){
    const initState = ''

    const [state,dispatch] = useFormState(authenticate,initState)
    return(
        <form className=" flex flex-col gap-2 w-64" action={dispatch}>
            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="rounded h-8 pl-1 text-black"/>
            </div>

            <div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="rounded h-8 pl-1 text-black"/>
                </div>
                
                <div className="text-red-500 mt-1 font-semibold">
                    {state}
                </div>
            </div>

            <button type="submit" className="bg-white text-blue-500 text-lg font-semibold rounded mt-4 pt-1 pb-1">
                Login
            </button>
            
            <div>
                Nie masz konta? <Link href={'/register'} className="hover:text-blue-300">Zarejestruj się</Link>                
            </div>
        </form>
    )
}