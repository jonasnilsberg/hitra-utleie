export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
        {children}
    </div>
  )
}
