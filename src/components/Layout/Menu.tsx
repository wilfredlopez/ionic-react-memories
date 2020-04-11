import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react"
import {
  bookmarkOutline,
  heartOutline,
  heartSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons"
import React from "react"
import { withRouter } from "react-router-dom"
import "./Menu.css"

interface AppPage {
  url: string
  iosIcon: string
  mdIcon: string
  title: string
}

const appPages: AppPage[] = [
  {
    title: "New Memory",
    url: "/new-memories",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: "Good Memories",
    url: "/good-memories",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Bad Memories",
    url: "/bad-memories",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
]

const labels = ["Family", "Friends", "Travel"]

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Memories</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={appPage.title ? "selected" : ""}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default withRouter(Menu)
