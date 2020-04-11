import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { happy, sad } from "ionicons/icons"
import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useMemoryContext } from "./context/MemoryContext"
import BadMemories from "./pages/BadMemories"
import GoodMemories from "./pages/GoodMemories"
// import NewMemories from "./pages/NewMemories"
import "./theme/global.css"
/* Theme variables & Ionic CSS */
import "./theme/variables.css"
import LazyComponent from "./LazyComponent"

const NewMemories = React.lazy(() => import("./pages/NewMemories"))

const NewMemoryLazyComponent = () => (
  <LazyComponent>
    <NewMemories />
  </LazyComponent>
)

const AppRoutes: React.FC = () => {
  const { initializeContext } = useMemoryContext()

  React.useLayoutEffect(() => {
    initializeContext()
    console.log("running initialize context")
  }, [initializeContext])
  return (
    <IonReactRouter>
      {/* <IonSplitPane contentId="main"> */}
      {/* <Menu /> */}
      <IonTabs>
        <IonRouterOutlet id="main">
          {/* <Route path="/page/:name" component={Page} exact={true} /> */}
          <Route path="/good-memories" component={GoodMemories} exact={true} />
          <Route path="/bad-memories" component={BadMemories} exact={true} />
          <Route
            path="/new-memories"
            component={NewMemoryLazyComponent}
            exact={true}
          />
          <Route
            path="/"
            render={() => <Redirect to="/good-memories" />}
            exact={true}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="good-memories" href="/good-memories">
            <IonIcon icon={happy} />
            <IonLabel>Good Memories</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bad-memories" href="/bad-memories">
            <IonIcon icon={sad} />
            <IonLabel>Bad Memories</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      {/* </IonSplitPane> */}
    </IonReactRouter>
  )
}

export default AppRoutes