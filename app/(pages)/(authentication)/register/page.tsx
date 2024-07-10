'use client'
import { RegisterUser } from "@/app/lib/actions"
import Link from "next/link"
import { useFormState } from "react-dom"

export default function Register(){
    const initState = {
        errors:{
            email: [],
            password: [],
            confirmpassword: [],
        }
    }
    const[state,disaptch] = useFormState(RegisterUser,initState)
    return(
        <form className=" flex flex-col gap-2 w-64" action={disaptch}>
            <div>
                <div className="flex flex-col">
                        <label htmlFor="confirmpassword">Imię</label>
                        <input type="text" id="name" name="name" className="rounded h-8 pl-1 text-black"/>
                </div>
                <div className="text-red-500 font-semibold">
                {state.errors.name?.map(err=>(<div key={err}>{err}</div>))}
                </div>
            </div>

            <div>
                <div className="flex flex-col">
                        <label htmlFor="confirmpassword">Nazwisko</label>
                        <input type="text" id="surename" name="surename" className="rounded h-8 pl-1 text-black"/>
                </div>
                <div className="text-red-500 font-semibold">
                {state.errors.surename?.map(err=>(<div key={err}>{err}</div>))}
                </div>
            </div>
            <div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="rounded h-8 pl-1 text-black"/>
                </div>
                <div className="text-red-500 font-semibold">
                    {state.errors.email?.map(err=>(<div key={err}>{err}</div>))}
                </div>
            </div>

            <div>
                <div className="flex flex-col">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" id="password" name="password" className="rounded h-8 pl-1 text-black"/>
                </div>
                <div className="text-red-500 font-semibold">
                {state.errors.password?.map(err=>(<div key={err}>{err}</div>))}
                </div>
            </div>

            <div>
                <div className="flex flex-col">
                        <label htmlFor="confirmpassword">Powtórz hasło</label>
                        <input type="password" id="confirmpassword" name="confirmpassword" className="rounded h-8 pl-1 text-black"/>
                </div>
                <div className="text-red-500 font-semibold">
                {state.errors.confirmpassword?.map(err=>(<div key={err}>{err}</div>))}
                </div>
            </div>

            <button type="submit" className="bg-white text-blue-500 text-lg font-semibold rounded mt-4 pt-1 pb-1">
                Załóż konto
            </button>
            
            <div>
                Masz już konto? <Link href={'/login'} className="hover:text-blue-300">Zaloguj się</Link>                
            </div>
        </form>
        
    )
}