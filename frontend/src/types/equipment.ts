export type Equipment = {
  id: string
  price?: string
  title: string
  description: string
  images: Array<string>
  spec: Record<string, string | number>
}
