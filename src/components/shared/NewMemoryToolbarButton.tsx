import { IonButton, IonButtons, IonIcon } from "@ionic/react"
import React from "react"

interface Props {
  icon: string
  routerLink: string
  slot?: string
}

const ToolbarActionButton = ({ icon, routerLink, slot }: Props) => {
  return (
    <IonButtons slot={slot ?? "end"}>
      <IonButton routerLink={routerLink}>
        <IonIcon icon={icon} slot="icon-only" />
      </IonButton>
    </IonButtons>
  )
}

export default ToolbarActionButton
