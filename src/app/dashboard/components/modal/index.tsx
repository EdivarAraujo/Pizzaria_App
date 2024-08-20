"use client"
import { use } from "react"
import { X } from "lucide-react"
import styles from "./styles.module.scss"
import { OrderContext } from "@/providers/order"
import RenderConditional from "@/components/RenderConditional"

export function ModalOrder(){
  const { onRequestClose, order } = use(OrderContext)

  return(
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
         <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#ff3f4b"/>
         </button>
         <article className={styles.container}>
           <h2>Detalhes do Pedido</h2>
           <span className={styles.table}>
             Mesa <b>{order[0]?.order?.table}</b>
           </span>
           <RenderConditional isTrue={!!order[0]?.order?.name}>  
            <span className={styles.name}>
                Nome da Mesa  - <b>{order[0]?.order?.name}</b>
            </span>
           </RenderConditional>
            {
              order.map((item) => {
                return(
                  <section className={styles.item} key={item?.id}>
                  <span>{item?.amount} - <b>{item?.product?.name}</b></span>
                  <span className={styles.description}>{item?.product?.description}</span>
                 </section>
                )
              })
            }
           
           <button className={styles.buttonOrder}>
            Concluir o pedido
           </button>
         </article>
      </section>
    </dialog>
  )
}