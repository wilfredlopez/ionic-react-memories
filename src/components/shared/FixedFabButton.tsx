import React from "react"
import { IonFab, IonFabButton, IonIcon } from "@ionic/react"

interface Props {
  icon: string
  routerLink: string
}

const FixedFabButton = ({ routerLink, icon }: Props) => {
  return (
    <IonFab horizontal="end" vertical="bottom" slot="fixed">
      <IonFabButton routerLink={routerLink}>
        <IonIcon icon={icon} />
      </IonFabButton>
    </IonFab>
  )
}

export default FixedFabButton
