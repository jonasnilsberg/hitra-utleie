import { Link, createFileRoute } from '@tanstack/react-router'
import Container from '../../components/Container'
import pb from '../../pocketbase'
import type { Category } from '../../types/category'

export const Route = createFileRoute('/kategorier/')({
  component: Categories,
  loader: async () => {
    const categories = await pb.collection<Category>('categories').getFullList()
    return { categories }
  },
})

function Categories() {
  const categories = Route.useLoaderData().categories

  return (
    <>
      <Container>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="py-18 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Kategorier
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
              Velg en kategori for å se det tilgjengelige utstyret innenfor den.
            </p>
          </div>
        </div>
        {categories.length === 0 && (
          <p className="text-center">Ingen kategorier funnet.</p>
        )}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="mt-12">
          <p className="font-semibold">SMART VALG: LEI MASKINER FREMFOR KJØP</p>
          <p className="mt-2">
            Å leie byggemaskiner og utstyr gir deg flere fordeler sammenlignet
            med kjøp. Du sparer både penger og tid, samtidig som du tar et
            miljøbevisst valg. Ved å velge utleie slipper du store
            investeringskostnader og kan i stedet bruke kapitalen på andre
            områder av prosjektet. Du unngår også utgifter til reparasjoner,
            service og tekniske problemer som kan stoppe arbeidet. Vi tilbyr
            fleksible løsninger som tilpasses ditt spesifikke prosjekt og behov.
            Vårt kompetente team hjelper deg med å velge rett utstyr og sikrer
            at alt er klart til bruk når du trenger det.Retry
          </p>
        </div>
      </Container>
    </>
  )
}

interface CategoryCardProps {
  category: Category
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to="/kategorier/$title/utstyr"
      className="shadow-[0px_10px_20px_rgba(190,190,190,0.3)] group"
      params={{ title: category.title }}
    >
      <div className="p-12 bg-white rounded-lg h-full">
        <div className="h-48">
          <div className="h-full flex justify-center items-center">
            <img
              src={pb.files.getURL(category, category.image)}
              className="max-h-48"
            />
          </div>
        </div>
        <p className="text-center mt-4 font-bold text-[20px] group-hover:underline">
          {category.title}
        </p>
      </div>
    </Link>
  )
}
