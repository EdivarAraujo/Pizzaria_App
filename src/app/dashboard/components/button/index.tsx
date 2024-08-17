"use client"
import styles from "./styles.module.scss"
import { useFormStatus } from "react-dom"

interface IButton{
  nome: string;
}

export function Button({nome}: IButton){
  const { pending } = useFormStatus() 

  return(
    <button type="submit" disabled={pending} className={styles.button}>
        { pending ? "Carregando..." : nome}
    </button>
  )
}