import { IonApp } from "@ionic/react"
import React from "react"
import AppRoutes from "./AppRoutes"
/* Theme variables & Ionic CSS */
import "./theme/variables.css"

/**
 * Overrides to the theme
 */
import "./theme/global.css"
import { MemoryContextProvider } from "./context/MemoryContext"

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
