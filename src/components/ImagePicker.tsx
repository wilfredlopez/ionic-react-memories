import { CameraPhoto, CameraResultType, CameraSource } from "@capacitor/core"
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from "@ionic/react"
import { availableFeatures, useCamera } from "@ionic/react-hooks/camera"
import { camera } from "ionicons/icons"
import React, { useCallback, useRef, useState } from "react"
import "./ImagePicker.css"

interface Props {
  onImagePicked: (photo: CameraPhoto | undefined) => void
}

const ImagePicker = (props: Props) => {
  const [takenPhoto, setTakenPhoto] = useState<CameraPhoto | undefined>()
  const { photo, getPhoto } = useCamera()
  const filePickerRef = useRef<HTMLInputElement>(null)

  const getFileWithHtmlInput = useCallback(() => {
    filePickerRef.current!.click()
  }, [])

  const triggerCamera = useCallback(async () => {
    try {
      await getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        width: 500,
      })
    } catch (error) {
      if (error === "User cancelled photos app") {
        console.log(error)
        getFileWithHtmlInput()
        return
      }
      getFileWithHtmlInput()
      console.log("Permissions Denied")
    }
  }, [getPhoto, getFileWithHtmlInput])

  React.useEffect(() => {
    setTakenPhoto(photo)
    props.onImagePicked(photo)
    //eslint-disable-next-line
  }, [photo])

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
    if (availableFeatures.getPhoto) {
      triggerCamera()
    } else {
      getFileWithHtmlInput()
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

export default ImagePicker
