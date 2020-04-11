import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
  IonText,
} from "@ionic/react"
import React from "react"
import MemoryList from "../components/shared/MemoryList"
import { Memory } from "../context/memory.model"
import FixedFabButton from "./shared/FixedFabButton"
import ToolbarActionButton from "./shared/NewMemoryToolbarButton"
import { add } from "ionicons/icons"

interface Props {
  title: string
  memories: Memory[]
  fallBackErrorMessage?: string
}

const MemoriesContent: React.FC<Props> = ({
  title,
  memories,
  fallBackErrorMessage,
}: Props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
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
        <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol>
              <h1>{title}</h1>
            </IonCol>
          </IonRow>
          {memories.length === 0 && (
            <IonRow>
              <IonCol sizeSm="6" offsetSm="3" className="ion-text-center">
                <IonText color="warning">
                  <h2>{fallBackErrorMessage ?? "No Memories found."}</h2>
                </IonText>
              </IonCol>
            </IonRow>
          )}
          <MemoryList memories={memories} />
        </IonGrid>
        {!isPlatform("ios") && (
          <FixedFabButton routerLink="/new-memories" icon={add} />
        )}
      </IonContent>
    </IonPage>
  )
}

export default React.memo(MemoriesContent)
