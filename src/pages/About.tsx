import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react"
import { add } from "ionicons/icons"
import React from "react"
import FixedFabButton from "../components/shared/FixedFabButton"
import ToolbarActionButton from "../components/shared/NewMemoryToolbarButton"
import "./about.css"
interface Props {}

const About = (props: Props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
          {isPlatform("ios") && (
            <ToolbarActionButton
              icon={add}
              routerLink="/new-memories"
              slot="end"
            />
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid id="about-content">
          <IonRow>
            <IonCol sizeSm="6" offsetSm="3" className="ion-text-center">
              <IonText>
                <h1>React Memories</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeSm="4" offsetSm="4" className="ion-text-center">
              <IonText>
                <p>
                  Take Pictures and save your memories on your device. Only
                  there you will be able to see them.
                </p>
              </IonText>
              <IonText>
                <small>Developed by Wilfred Lopez @2020</small>
              </IonText>
            </IonCol>
          </IonRow>
          {!isPlatform("ios") && (
            <FixedFabButton routerLink="/new-memories" icon={add} />
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default About
