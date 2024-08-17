"use client"
import { useState } from "react"
import { ChangeEvent } from "react"
import styles from "./styles.module.scss"
import { UploadCloud } from "lucide-react"
import RenderConditional from "@/components/RenderConditional"
import Image from "next/image"
import { Button } from "@/app/dashboard/components/button"
import { api } from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CategoryProps{
  id:string;
  name:string;
}

interface ICategory{
  categories: CategoryProps[]
}

export function Form({categories}: ICategory){
  const router = useRouter()
  const [image, setImage] = useState<File>()
  const [previewImage, setPrewiewImage] = useState("")
  const token = getCookieClient()


  async function handleRegisterProduct(formData:FormData){

    const categoryIndex = formData.get("category")
    const name = formData.get("name")
    const price = formData.get("price")
    const description = formData.get("description")
    
    if(!categoryIndex || !name || !price || !description || !image){
      toast.warning("Preecha todos os campos")
      return 
    }

    const data = new FormData()

    data.append("name", name)
    data.append("price", price)
    data.append("description", description)
    data.append("category_id", categories[Number(categoryIndex)].id)
    data.append("file", image)

    try {
        await api.post("/product/create", data, {
        headers:{
          Authorization: `Bearer ${token}`
        }
       })
      
    } catch (error) {
      toast.warning("Falha ao cadastrar esse produto")
      console.log(error, "Erro na requisicao")
    }

    toast.success("Produto cadastrado com sucesso")
    router.push("/dashboard")

  }

  function handleFile(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0]

      if(image?.type !== "image/jpeg" && image?.type !== "image/png"){
        toast.warning("Formato nao permitido")
        return
      }
  
      setImage(image)
      setPrewiewImage(URL.createObjectURL(image))
    }
    
  }


  return(
    <main className={styles.container}>
      <h1>Novo Produto</h1>
        <form action={handleRegisterProduct} className={styles.form}>
          <label className={styles.labelImage}>
            <span>
              <UploadCloud size={30} color="#FFF"/>
            </span>
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              required
              onChange={handleFile}
              />
              {
                <RenderConditional isTrue={!!previewImage}>
                  <Image
                    alt="Imagem de prewiew"
                    className={styles.prewiew}
                    src={previewImage}
                    fill={true}
                    quality={100}
                    priority={true}
                  />
                </RenderConditional>
              }
          </label>
          <select name="category">
            {
              categories.map((category, index) => {
                return(
                  <option key={category?.id} value={index}>{category?.name}</option>
                )
              })
            }
          </select>
          <input 
            type="text" 
            name="name"
            placeholder="Digite o nome do produto..."
            required
            className={styles.input}
          />
          <input 
            type="text" 
            name="price"
            placeholder="Preco do produto..."
            required
            className={styles.input}
          />
          <textarea 
            className={styles.input}
            placeholder="Digite a descricao do produto..." 
            required
            name="description"
          ></textarea>
          <Button nome="Cadastrar produto"/>
        </form>
    </main>
  )
}