import {
  CameraPhoto,
  CameraResultType,
  CameraSource,
  Capacitor,
  Plugins,
} from "@capacitor/core"
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from "@ionic/react"
import { camera } from "ionicons/icons"
import React, { useCallback, useRef, useState } from "react"
import "./ImagePicker.css"

const { Camera } = Plugins

interface Props {
  onImagePicked: (photo: CameraPhoto | undefined) => void
}

const ImagePickerOLD = (props: Props) => {
  const [takenPhoto, setTakenPhoto] = useState<CameraPhoto | undefined>()
  const filePickerRef = useRef<HTMLInputElement>(null)

  const getFileWithHtmlInput = useCallback(() => {
    filePickerRef.current!.click()
  }, [])

  function onFilePickedWithHtmlInput(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!event.target.files) {
      return
    }
    const file = event.target.files[0]

    if (!file) {
      return
    }
    const fileReader = new FileReader()

    fileReader.onload = () => {
      const photo = {
        format: "image/jpeg",
        base64String: fileReader.result!.toString(),
        webPath: fileReader.result!.toString(),
      }

      setTakenPhoto(photo)
      props.onImagePicked(photo)
    }

    fileReader.readAsDataURL(file)
  }

  const handleTakePhoto = async () => {
    if (!Capacitor.isPluginAvailable("Camera")) {
      getFileWithHtmlInput()
      return
    }
    if (Capacitor.isPluginAvailable("Camera")) {
      Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        width: 500,
      })
        .then((photo) => {
          console.log(photo)

          if (!photo || !photo.webPath) {
            console.log("no foto")
            return
          }

          setTakenPhoto(photo)
          props.onImagePicked(photo)
        })
        .catch((e) => {
          console.log("Permission Denied")
          getFileWithHtmlInput()
        })
    }
  }

  return (
    <React.Fragment>
      <IonGrid className="ion-padding">
        <IonRow className="ion-text-center">
          <IonCol>
            <div
              className="image-preview"
              role="button"
              onClick={handleTakePhoto}
            >
              {!takenPhoto && <h3>No Photo Taken.</h3>}
              {takenPhoto && <img alt="" src={takenPhoto.webPath} />}
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol>
            <IonButton fill="clear" color="secondary" onClick={handleTakePhoto}>
              <IonIcon icon={camera} slot="start" />
              <IonLabel>Take Photo</IonLabel>
            </IonButton>
            <input
              onChange={onFilePickedWithHtmlInput}
              ref={filePickerRef}
              type="file"
              hidden
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </React.Fragment>
  )
}

export default ImagePickerOLD
