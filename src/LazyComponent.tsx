import React, { PropsWithChildren } from "react"
import { IonLoading } from "@ionic/react"

interface Props extends PropsWithChildren<{ children: React.ReactNode }> {}

/**
 *
 * @param props children: React.ReactNode
 */
const LazyComponent: React.FC<Props> = (props: Props) => {
  return (
    <React.Suspense
      fallback={<IonLoading isOpen={true} message="Loading..." />}
    >
      {props.children}
    </React.Suspense>
  )
}

export default LazyComponent
