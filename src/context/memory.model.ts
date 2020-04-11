export type MemoryType = "good" | "bad"
export interface Memory {
  id: string
  imagePath: string
  title: string
  type: MemoryType
  base64String: string
}
