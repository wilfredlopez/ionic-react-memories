import React from "react"
import MemoriesContent from "../components/MemoriesContent"
import { useMemoryContext } from "../context/MemoryContext"

interface Props {}

const GoodMemories: React.FC<Props> = (props: Props) => {
  const { memories } = useMemoryContext()

  const goodMemories = memories.filter((m) => m.type === "good")
  return (
    <MemoriesContent
      memories={goodMemories}
      title="Good Memories"
      fallBackErrorMessage="No Good Memories found."
    />
  )
}

export default GoodMemories
