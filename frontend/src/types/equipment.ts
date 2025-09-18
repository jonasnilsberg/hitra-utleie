export type Equipment = {
  id: string
  price?: string
  title: string
  description: string
  images: string[]
  spec: Record<string, string | number>
}
