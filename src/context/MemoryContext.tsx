import React, { PropsWithChildren, useContext, useCallback } from "react"
import { Memory, MemoryType } from "./memory.model"
import { availableFeatures as availableStorageFeatures } from "@ionic/react-hooks/storage"
import {
  Plugins,
  Filesystem,
  FilesystemDirectory,
  CameraPhoto,
} from "@capacitor/core"
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem"

const { Storage } = Plugins
interface MemoryContextInterface {
  memories: Memory[]
  addMemory: (takenPhoto: CameraPhoto, title: string, type: MemoryType) => void
  deleteMemory: (id: string) => Promise<void>
  initializeContext: () => Promise<void>
}

const initialMemoryState: MemoryContextInterface = {
  memories: [],
  addMemory: () => {},
  deleteMemory: (() => {}) as any,
  initializeContext: (() => {}) as any,
}

const MemoryContext = React.createContext<MemoryContextInterface>(
  initialMemoryState,
)

const MemoryContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [memories, setMemories] = React.useState<Memory[]>([])
  const fileSystem = useFilesystem()

  React.useEffect(() => {
    if (availableStorageFeatures.useStorage) {
      const storableMemories: Omit<Memory, "base64String">[] = memories.map(
        (memory) => {
          return {
            id: memory.id,
            imagePath: memory.imagePath,
            title: memory.title,
            type: memory.type,
          }
        },
      )
      Storage.set({ key: "memories", value: JSON.stringify(storableMemories) })
    }
  }, [memories])

  //   React.useEffect(() => {
  //     initializeContext().then((data) => {
  //       console.log(data)
  //     })
  //   }, [])

  const initializeContext = useCallback(async () => {
    const value = await Storage.get({ key: "memories" })
    if (!value || typeof value.value !== "string") {
      console.log("there is no value", value)
      return
    }

    const storedMemories = JSON.parse(value.value) as Omit<
      Memory,
      "base64String"
    >[]

    if (storedMemories.length > 0) {
      const retrievedMemories: Memory[] = []
      for (const data of storedMemories) {
        const file = await Filesystem.readFile({
          path: data.imagePath,
          directory: FilesystemDirectory.Data,
        })

        retrievedMemories.push({
          ...data,
          base64String: "data:image/jpeg;base64," + file.data,
        })
      }

      setMemories(retrievedMemories)
    } else {
      console.log("storedMemories lengh not > 0", storedMemories)
    }
  }, [])

  async function deleteMemory(id: string) {
    const index = memories.findIndex((m) => m.id === id)
    if (index === -1) {
      console.log("memory not found")
      return
    }
    const newMemories: Memory[] = memories
      .filter((m) => m.id !== id)
      .map((m) => {
        return {
          ...m,
        }
      })
    //use effect will automatically update the storage with the deleted memories
    setMemories(newMemories)
  }

  async function addMemory(
    takenPhoto: CameraPhoto,
    title: string,
    type: MemoryType,
  ) {
    const base64String = await base64FromPath(takenPhoto.webPath!)
    const path = new Date().getTime() + ".jpeg"
    fileSystem.writeFile({
      path: path,
      data: base64String,
      directory: FilesystemDirectory.Data,
    })

    const newMemory: Memory = {
      id: "memoryId" + memories.length + Math.random().toString(),
      imagePath: path,
      title: title,
      type: type,
      base64String,
    }

    setMemories((current) => current.concat(newMemory))
  }
  return (
    <MemoryContext.Provider
      value={{
        memories,
        addMemory,
        initializeContext,
        deleteMemory,
      }}
    >
      {props.children}
    </MemoryContext.Provider>
  )
}

export const useMemoryContext = () => {
  const memoryContext = useContext(MemoryContext)

  return {
    ...memoryContext,
  }
}

export { MemoryContext, MemoryContextProvider }
