import { NextRequest, NextResponse } from "next/server"
import { getCookieServer } from "@/lib/cookieServer" 
import { api } from "./services/api"

export async function middleware(req:NextRequest, res:NextResponse) {
  const { pathname } = req.nextUrl

  console.log(pathname, "teste")
  
  if(pathname.startsWith("_next") || pathname === "/"){
    return NextResponse.next()
   }
  
   const token = getCookieServer()

   if(pathname.startsWith("/dashboard")){
     if(!token){
      return NextResponse.redirect(new URL("/", req.url))
     }

     const isValid = await validateToken(token)

     if(!isValid){
      return NextResponse.redirect(new URL("/", req.url))
     }
   }
   return NextResponse.next()
}

async function validateToken(token:string) {
  if(!token) return false

  try {
    await api.get("/me", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    return true
    
  } catch (error) {
    console.log(error, "Erro na requisicao")
    return false
  }
}