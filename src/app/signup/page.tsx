import Image from "next/image"
import Link from "next/link"
import styles from "../page.module.scss"
import logoImg from "../../../public/Logo.svg"
import { api } from "@/services/api"
import { redirect } from "next/navigation"

export default function Signup(){

  async function handleRegister(formData: FormData){
    "use server"

    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    if(name ==="" || email === "" || password === ""){
      console.log("Preencha todos os campos")
      return 
    }

    const data = {
      name,
      email,
      password
    }

    try {
      await api.post("/users", data)

    } catch (error) {
      console.log(error, "Erro na requisicao")
    }

    redirect("/")


  }

  return(
    <div className={styles.containerCenter}>
    <Image
      src={logoImg}
      alt='Logo da pizzaria'
    />
    <section className={styles.login}>
      <h1>Criando sua conta</h1>
       <form action={handleRegister}>
        <input 
         type="text"
         required
         name='name'
         placeholder='Digite seu nome...'
         className={styles.input}
        />
         <input 
         type="email"
         required
         name='email'
         placeholder='Digite se email...'
         className={styles.input}
        />
        <input 
         type="password"
         required
         name='password'
         placeholder='*********'
         className={styles.input}
        />
        <button className={styles.button} type='submit'>
          Cadastrar
        </button>
       </form> 
       <Link href="/" className={styles.text}>
         Ja possui uma conta? Faca login
       </Link>
    </section>
  </div>
  )
}