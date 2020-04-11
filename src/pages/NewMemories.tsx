import { CameraPhoto } from "@capacitor/core"
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import React, { useRef, useState } from "react"
import { useHistory } from "react-router"
import ImagePicker from "../components/ImagePicker"
import { useMemoryContext } from "../context/MemoryContext"
import { MemoryType } from "../context/memory.model"

interface Props {}

interface SelectChangeEventDetail<T> {
  value: T | null | undefined
}

const NewMemories = (props: Props) => {
  const [takenPhoto, setTakenPhoto] = useState<CameraPhoto | undefined>()
  const [memoryType, setMemoryType] = useState<MemoryType>("good")
  const [showAlert, setShowAlert] = useState(false)
  const titleInputRef = useRef<HTMLIonInputElement>(null)
  const { addMemory } = useMemoryContext()
  const history = useHistory()

  function handleSelectGoodOrBad(
    event: CustomEvent<SelectChangeEventDetail<MemoryType>>,
  ) {
    const value = event.detail.value
    if (!value) {
      return
    }
    if (value !== memoryType) {
      setMemoryType(value)
    }
  }

  async function addMemoryHandle() {
    if (!titleInputRef.current || !titleInputRef.current.value?.toString()) {
      setShowAlert(true)
      return
    }
    const title = titleInputRef.current!.value

    if (!takenPhoto || !takenPhoto.webPath) {
      setShowAlert(true)
      return
    }

    if (!memoryType || !title || title.toString().trim().length === 0) {
      setShowAlert(true)
      return
    }

    addMemory(takenPhoto, title.toString(), memoryType)
    setTakenPhoto(undefined)
    titleInputRef.current!.value = ""

    if (history.length > 0) {
      history.goBack()
    } else {
      history.replace("/good-memories")
    }
  }

  return (
    <React.Fragment>
      <IonPage>
        <IonAlert
          isOpen={showAlert}
          header="Upps! Something went wrong"
          message="Please make sure to have a photo taken and a memory title before adding the memory."
          buttons={["Ok"]}
        />
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton>
                <IonBackButton defaultHref="/good-memories" />
              </IonButton>
              <IonTitle>Add New Memory</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol sizeSm="6" offsetSm="3">
                <IonItem>
                  <IonLabel position="floating">Memory Title</IonLabel>
                  <IonInput ref={titleInputRef} type="text" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Memory Type</IonLabel>
                  <IonSelect
                    interfaceOptions={
                      {
                        // header: "Memory Type",
                        // subHeader: "Select your memory type",
                      }
                    }
                    color="primary"
                    onIonChange={handleSelectGoodOrBad}
                    value={memoryType}
                  >
                    <IonSelectOption value="good">Good Memory</IonSelectOption>
                    <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>

            <ImagePicker onImagePicked={(photo) => setTakenPhoto(photo)} />
            <IonRow className="ion-text-center">
              <IonCol>
                <IonButton onClick={addMemoryHandle}>
                  {/* <IonIcon icon={camera} slot="start" /> */}
                  <IonLabel>Add Memory</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  )
}

export default NewMemories
