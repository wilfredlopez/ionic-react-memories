import React from "react"
import MemoriesContent from "../components/MemoriesContent"
import { useMemoryContext } from "../context/MemoryContext"

interface Props {}

const BadMemories = (props: Props) => {
  const { memories } = useMemoryContext()

  const badMemories = memories.filter((m) => m.type === "bad")
  return (
    <MemoriesContent
      memories={badMemories}
      title="Bad Memories"
      fallBackErrorMessage="No Bad Memories found."
    />
  )
}

export default BadMemories
