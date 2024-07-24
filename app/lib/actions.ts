'use server'
import { sql } from '@vercel/postgres';
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { auth, signIn } from '../pages/api/auth/[...nextauth]';
import { revalidatePath } from 'next/cache';
import { contextUserType, DayType } from './types';

const UserID = async () => {
    const user = await auth()
    const userID = user?.user?.id
    return userID
}

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

    await sql`
        INSERT INTO marksjobusers (username,password,email,name,surename) VALUES (${Math.random().toString()}, ${hashedPassword}, ${email}, ${name}, ${surename})
    `

    redirect('/login')
}

export const authenticate =  async (prevState: string | undefined, formData: FormData) => {
    try{
      await signIn('credentials',formData)
    }catch(e){
      if(e instanceof AuthError){
        //workaround next js auth
        //if(e.cause?.err?.code === 'credentials') return "Zły login lub hasło";
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

    const userID = await UserID()

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
    const userID = await UserID()

    const days = await sql`
        SELECT * FROM marksjobdays WHERE userid = ${userID} AND endhour IS NOT NULL ORDER BY day DESC LIMIT 12
    `
    revalidatePath('/home')
    return days.rows as DayType[]
}

type SearchByDateState = {
    error?: string,
    data?: DayType[]
}

export async function searchByDate(prevState:SearchByDateState,formData:FormData){

    const from = formData.get('from') as string
    const to = formData.get('to') as string

    if(from === '' || to === '' || typeof from === 'undefined' || typeof to === 'undefined' ){
        return {
            error: 'Wprowadź daty'
        }
    }
    if(new Date(from)>new Date(to)){
        return {
            error: 'Zły zakres dat'
        }
    }

    try{
        const data = await FetchByDate(from,to)
        return {
            data: data
        }
    }catch(e){
        return {
            error: 'Coś poszło nie tak'
        }
    }
}
export const FetchByDate = async (from: string, to: string) => {
    const userID = await UserID()

     const data = await sql`
    SELECT * FROM marksjobdays WHERE userid= ${userID} AND day BETWEEN ${from} AND ${to} ORDER BY day DESC
    `
    return data.rows as  DayType[]
}
export const getUser = async () =>{
    const userID = await UserID()

    const userData = await sql`
        SELECT name,surename,email FROM marksjobusers WHERE id = ${userID}
    `
    return userData.rows[0] as contextUserType

}
type RemoveIndexesState = {
    error: string,
}
export const RemoveMultipleIds = async (ids:string[]) => {
    'use server'
    if(ids.length===0){
        return { error: 'Zaznacz indexy które chcesz usunąć'}
    }
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
    revalidatePath('/home/remove')
    redirect('/home')
}

export const StartWork = async () => {
    const userID = await UserID()

    const date = new Date()
    const start = `${date.getHours()}:${date.getMinutes()}:00`

    await sql`
    INSERT INTO marksjobdays (day,starthour,endhour,workplace,liters,counterreading,userid) VALUES (${JSON.stringify(date)},${start},${null},${null},${null},${null},${userID})
    `

    return null
}

export const checkIfIsWorking = async () => {
    const userID = await UserID()

    const hasWorkStarted = await sql`
        SELECT * FROM marksjobdays WHERE userid = ${userID} AND endhour IS NULL;
    `
    console.log(hasWorkStarted.rows,userID)
    if(hasWorkStarted.rows[0]) return true
    
    return false
}

type EndWorkState = {
    errors?:{
        workplace?: string[],
        liters?: string[],
        counter?: string[],
        defaultError?: string
    } 
}

export const EndWork = async (prevState: EndWorkState,formData: FormData) => {
    const userID = await UserID()
    const ZodEndWork = addDayZod.omit({end:true,date:true,start:true})

    const validateFields = ZodEndWork.safeParse({
        workplace: formData.get('workplace'),
        liters: Number(formData.get('liters') as string),
        counter: Number(formData.get('counter') as string),
    })

    if(!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    const { workplace, counter, liters } = validateFields.data
    const Days = await sql`
    SELECT * FROM marksjobdays WHERE userid = ${userID} AND endhour IS NULL;
    `

    if(!Days) return { errors: {
        defaultError: 'Something went wrong',
        workplace: [''],
        liters: [''],
        counter: [''],
    }}
    const DayID = Days.rows[0].id
    const date = new Date()
    const EndHour = `${date.getHours()}:${date.getMinutes()}:00`

    await sql`
        UPDATE marksjobdays
        SET endhour = ${EndHour}, workplace = ${workplace}, liters = ${liters}, counterreading = ${counter}
        WHERE id = ${DayID}
    `
    revalidatePath('/home')
    redirect('/home')
}

