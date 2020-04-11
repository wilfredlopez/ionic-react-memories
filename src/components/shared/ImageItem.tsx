import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
} from "@ionic/react"
import { trash } from "ionicons/icons"
import React from "react"
import { useMemoryContext } from "../../context/MemoryContext"
import "./imageItem.css"

interface Props {
  src: string
  title: string
  id: string
}

const ImageItem = ({ src, title, id }: Props) => {
  const { deleteMemory } = useMemoryContext()

  function handleDelete() {
    deleteMemory(id)
  }

  return (
    <IonCard className="imageItem">
      <img alt={title} src={src} />
      <IonCardHeader className="ion-no-padding">
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonItem lines="none" className="ion-no-padding">
        <IonButton slot="end" onClick={handleDelete}>
          <IonIcon icon={trash} slot="icon-only" />
        </IonButton>
      </IonItem>
    </IonCard>
  )
}

export default ImageItem
