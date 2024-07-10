'use server'
import { sql } from '@vercel/postgres';
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { auth, signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { contextUserType, DayType } from './types';

type loginRegisterState = {
    message? : string,
    errors? : {
        name?: string[],
        surename?: string[],
        email?: string[],
        password?: string[],
        confirmpassword?: string[],
        loginError?:string,
    }
}

const loginRegisterSchema = z.object({
    name: z.string().min(3, 'Imię musi mieć conajmniej trzy znaki'),
    surename: z.string().min(3, 'Nazwisko musi mieć conajmniej trzy znaki'),
    email: z.string().email('Zły format adresu email'),
    password: z.string().min(8,'Hasło powinno mieć minimum 8 znaków'),
    confirmpassword: z.string(),
}).refine((data)=>data.password === data.confirmpassword,{
    message: "Hasła różnią się",
    path: ["confirmpassword"]
})

export async function RegisterUser(prevState:loginRegisterState,formData:FormData){
    const validateFields = loginRegisterSchema.safeParse({
        name:  formData.get('name'),
        surename:  formData.get('surename'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmpassword: formData.get('confirmpassword'),
    })
    if(!validateFields.success){
        return{
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    const { email, password, name, surename } = validateFields.data

    const EmailTaken = await sql`
        SELECT 1 FROM marksjobusers WHERE email = ${email}
    `
    if(EmailTaken.rows[0]){
        return{
            errors:{email:['Adres email jest już zajęty']}
        }
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const saveUser = await sql`
        INSERT INTO marksjobusers (username,password,email,name,surename) VALUES (${Math.random().toString()}, ${hashedPassword}, ${email}, ${name}, ${surename})
    `

    redirect('/login')
}

export const authenticate =  async (prevState: string | undefined, formData: FormData) => {
    try{
      await signIn('credentials',formData)
    }catch(e){
      if(e instanceof AuthError){
        switch(e.type){
          case 'CredentialsSignin':
            return "Zły login lub hasło";
          default:
            return "Coś poszło nie tak";
        }
      }
      throw e
    }
  }

type addDayState = {
    errors?:{
        zodErrors?:{
            date?: string[],
            start?: string[],
            end?: string[],
            workplace?: string[],
            liters?: string[],
            counter?: string[],
        }
        message?: string,
    }
} | undefined

const addDayZod = z.object({
    date: z.date({errorMap: (issue, { defaultError }) => ({
        message: issue.code === "invalid_date" ? "Data jest w złym formacie" : defaultError,
      })}),
    start: z.string().time({message:'Godzina jest w złym formacie'}),
    end: z.string().time({message:'Godzina jest w złym formacie'}),
    workplace: z.string().min(1,'To pole nie może być puste').max(255,'Miejsce pracy może mieć max 255 znaków'),
    liters: z.number().min(1,"Ilość litrów nie może być mniejsza od 1").optional().or(z.literal(0)),
    counter: z.number().min(1,"Stan licznika nie może być mniejszy od 1").optional().or(z.literal(0)),
})
export async function addDay(prevState:addDayState | addDayState & {errors:{message?: string}},formData:FormData){

    const validateFields = addDayZod.safeParse({
        date: new Date(formData.get('date') as string),
        start: formData.get('start') as string + ':00',
        end: formData.get('end') as string + ':00',
        workplace: formData.get('workplace'),
        liters: Number(formData.get('liters') as string),
        counter: Number(formData.get('counter') as string),
    })

    if(!validateFields.success){
        return {
            errors: {zodErrors :validateFields.error.flatten().fieldErrors, message:''}
        }
    }

    const { date, start, end, workplace, liters, counter } = validateFields.data

    const user = await auth()
    const userID = user?.user?.id

    try{
        await sql`
            INSERT INTO marksjobdays (day,starthour,endhour,workplace,liters,counterreading,userid) VALUES (${JSON.stringify(date)},${start},${end},${workplace},${liters},${counter},${userID})
        `
    }catch(e){
        console.log(e)
        return{
            errors: { message: 'Coś poszło nie tak'}
            
        }
    }
    revalidatePath('/home')
    redirect('/home')
}

export async function getDays(){
    const user = await auth()
    const userID = user?.user?.id

    const days = await sql`
        SELECT * FROM marksjobdays WHERE userid = ${userID} ORDER BY day DESC LIMIT 12
    `
    revalidatePath('/home')
    return days.rows as DayType[]
}

type SearchByDateState = {
    error?: string,
}

export async function searchByDate(prevState:SearchByDateState,formData:FormData){
    const user = await auth()
    const userID = user?.user?.id

    const from = formData.get('from') as string
    const to = formData.get('to') as string

    if(!from || !to){
        return {
            error: 'Wprowadź daty'
        }
    }
    if(new Date(from) > new Date(to)){
        return {
            error: 'Zły zakres dat'
        }
    }

    try{
        const data = await sql`
            SELECT * FROM marksjobdays WHERE userid= ${userID} AND day BETWEEN ${from} AND ${to} ORDER BY day DESC
        `
        return {
            data: data.rows as DayType[]
        }
    }catch(e){
        return {
            error: 'Coś poszło nie tak'
        }
    }
}

export const getUser = async () =>{
    const user = await auth()
    const userID = user?.user?.id
    if(!userID) return null

    const userData = await sql`
        SELECT name,surename,email FROM marksjobusers WHERE id = ${userID}
    `
    return userData.rows[0] as contextUserType

}
type RemoveIndexesState = {
    error: string,
}
export const RemoveMultipleIds = async (ids:string[],prevState:RemoveIndexesState,formData:FormData) => {
    'use server'
    try{
        ids.forEach(async(id)=>{
                await sql`
                DELETE FROM marksjobdays WHERE id = ${id};
            `
        })

    }catch(e){
        console.log(e)
        return {error: 'Nie można było usunąć niektórch indexów'}
    }
    
    revalidatePath('/home')
    redirect('/home')
}

