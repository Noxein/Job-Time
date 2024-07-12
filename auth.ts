// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import { sql } from "@vercel/postgres";
// import bcrypt from 'bcrypt'

// const getUser = async (email: string) => {
//     try{
//         const user = await sql`
//             SELECT * FROM marksjobusers WHERE email = ${email};
//         `
//         const singleUser = user.rows[0]
//         singleUser.name = singleUser.email
//         console.log(singleUser.id)
//         return singleUser
//     }catch(e){
//         console.error('Failed to fetch user',e)
//     }
// }
// const getUserId = async (email: string) => {
//     try{
//         const user = await sql`
//             SELECT id FROM marksjobusers WHERE email = ${email}
//         `
//         const userID =user.rows[0].id
//         return userID
//     }catch(e){
//         console.log(e)
//     }

// }

// export const { auth, signIn, signOut } = NextAuth({
//     ...authConfig,
//     providers:[credentials({
//         name:'Credencials',
        
//         async authorize(credentials){

//             const parsedCredencials = z.object({email: z.string().email(), password: z.string().min(5) })
//             .safeParse(credentials);
//             if(parsedCredencials.success){
//                 const { email, password } = parsedCredencials.data;
//                 const user = await getUser(email)
//                 if(!user) return null

//                 const passwordsMatch = await bcrypt.compare(password, user.password);
//                 if(passwordsMatch) return user
//             }
//             return null
//         }
//     })],
//     session: { strategy: 'jwt' },
//     secret : process.env.AUTH_SECRET,
//     debug: process.env.NODE_ENV === 'development',
//     callbacks: {
//       session({ session, token }) {
//         const userID = token.userID as string
//         const sessionCopy = {...session}
//         sessionCopy.user.id = userID
//         return sessionCopy
//       },
//     async jwt({token, user}) {
//         const userID = await getUserId(token.email!)
//         return {...token, userID }
//     } 
//     }
// })