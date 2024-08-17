import { Header } from "./components/header/header"


export default function DashboardLayout({children}:{children:React.ReactNode}){
  return(
    <>
      <Header/>
     {children}
    </>
  )
}