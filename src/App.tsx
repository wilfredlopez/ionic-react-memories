import { IonApp } from "@ionic/react"
import React from "react"
import AppRoutes from "./AppRoutes"
import "./theme/global.css"
/* Theme variables & Ionic CSS */
import "./theme/variables.css"
import { MemoryContextProvider } from "./context/MemoryContext"

/* Theme variables & Ionic CSS */

const App: React.FC = () => {
  return (
    <MemoryContextProvider>
      <IonApp>
        <AppRoutes />
      </IonApp>
    </MemoryContextProvider>
  )
}

export default App
