import { IonCol, IonRow } from "@ionic/react"
import React from "react"
import { Memory } from "../../context/memory.model"
import ImageItem from "./ImageItem"

interface Props {
  memories: Memory[]
}

const MemoryList = ({ memories }: Props) => {
  return (
    <React.Fragment>
      {memories.map((m) => {
        return (
          <IonRow key={m.id} className="ion-text-center">
            <IonCol sizeSm="6" offsetSm="3">
              <ImageItem src={m.base64String} title={m.title} id={m.id} />
            </IonCol>
          </IonRow>
        )
      })}
    </React.Fragment>
  )
}

export default MemoryList
