import { redirect } from "next/navigation"
import { getCookieServer } from "@/lib/cookieServer"
import styles from "./styles.module.scss"
import { Button } from "@/app/dashboard/components/button"
import { api } from "@/services/api"

export default function Category(){
  
  async function handleRegisterCategory(formData:FormData) {
    "use server"
    
    const name = formData.get("name")

    if(!name) return

    const data = {
      name
    }

    const token = getCookieServer()

    try {
    const teste = await api.post("/category", data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      
      console.log(teste )
    } catch (error) {
      console.log(error, "Erro na requisicao")
      return
    }

    redirect("/dashboard")
    
  }

  return(
    <main className={styles.container}>
      <h1>Nova Categoria</h1>
      <form action={handleRegisterCategory} className={styles.form}>
        <input 
          type="text" 
          name="name"
          placeholder="Nome da Categoria, ex: pizzas"
          required
          className={styles.input}
        />

        <Button nome="Cadastrar"/>

      </form>
    </main>
  )
}