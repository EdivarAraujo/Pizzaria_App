import styles from "./styles.module.scss"
import { RefreshCcw } from "lucide-react"
import { OrderProps } from "@/lib/order.type"
import { ModalOrder } from "@/app/dashboard/components/modal"


interface Props{
  orders: OrderProps[]
}

export function Order({orders}: Props){
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
            orders.map((order, index) =>{
              return(
                <button key={order?.id} className={styles.orderItem}>
                <div className={styles.tag}></div>
                <span>Mesa: {order?.table}</span>
              </button>
              )
            })
          }
        </section>
      </main>
     <ModalOrder/>
    </>
  )
}