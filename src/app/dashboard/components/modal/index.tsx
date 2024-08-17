import styles from "./styles.module.scss"
import { X } from "lucide-react"

export function ModalOrder(){
  return(
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
         <button className={styles.dialogBack}>
          <X size={40} color="#ff3f4b"/>
         </button>
         <article className={styles.container}>
           <h2>Detalhes do Pedido</h2>
           <span className={styles.table}>
             Mesa <b>35</b>
           </span>
           <section className={styles.item}>
            <span>1 - <b>Pizza catupiry</b></span>
            <span className={styles.description}>Pizza de frango catupiry, borda recheada</span>
           </section>
           <button className={styles.buttonOrder}>
            Concluir o pedido
           </button>
         </article>
      </section>
    </dialog>
  )
}