"use client"
import { use } from "react"
import styles from "./styles.module.scss"
import { RefreshCcw } from "lucide-react"
import { OrderProps } from "@/lib/order.type"
import { ModalOrder } from "@/app/dashboard/components/modal"
import { OrderContext } from "@/providers/order"
import RenderConditional from "@/components/RenderConditional"



interface Props{
  orders: OrderProps[]
}

export function Order({orders}: Props){
  const { isOpen, onRequestOpen } = use(OrderContext)

  async function handleDetailOrder(order_id:string){
   await onRequestOpen(order_id)
  }

  return(
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
        <h1>Ultimos pedidos</h1>
          <button>
          <RefreshCcw size={24} color="#3fffa3"/>
          </button>
        </section>
        <section className={styles.listOrders}>
          {
            orders.map((order) =>{
              return(
                <button key={order?.id} className={styles.orderItem} onClick={() => handleDetailOrder(order?.id)}>
                <div className={styles.tag}></div>
                <span>Mesa: {order?.table}</span>
              </button>
              )
            })
          }
        </section>
      </main>
      <RenderConditional isTrue={isOpen}>
         <ModalOrder/>
      </RenderConditional>
    </>
  )
}