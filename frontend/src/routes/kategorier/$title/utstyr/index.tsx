import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import Container from '../../../../components/Container'
import pb from '../../../../pocketbase'
import type { Category } from '../../../../types/category'
import type { Equipment } from '../../../../types/equipment'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

export const Route = createFileRoute('/kategorier/$title/utstyr/')({
  component: CategoryEquipment,
  loader: async ({ params }) => {
    try {
      const equipment = await pb
        .collection<Equipment>('equipment')
        .getFullList({ filter: `category.title = "${params.title}"` })
      const category = await pb
        .collection<Category>('categories')
        .getFirstListItem(`title = "${params.title}"`)
      return { equipment, category }
    } catch (error) {
      console.error(error)

      throw notFound()
    }
  },
})

function CategoryEquipment() {
  const { equipment, category } = Route.useLoaderData()

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="flex">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400"
              />
              <Link
                to={'/kategorier'}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Kategorier
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400"
              />
              <Link
                to={'/kategorier/$title/utstyr'}
                params={{ title: category.title }}
                aria-current={'page'}
                className="ml-4 text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                {category.title}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className="py-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {category.title}
        </h1>
        <p className="mt-4 text-gray-500">{category.description}</p>
      </div>
      {equipment.length === 0 && (
        <p className="">
          Ingen utstyr funnet i denne kategorien. Kom tilbake senere :-)
        </p>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {equipment.map((eq) => (
          <EquipmentCardWithImage
            key={eq.id}
            equipment={eq}
            category={category}
          />
        ))}
      </div>
    </Container>
  )
}

interface EquipmentCardProps {
  equipment: Equipment
  category: Category
}

function EquipmentCardWithImage({ equipment, category }: EquipmentCardProps) {
  return (
    <Link
      to={`/kategorier/$title/utstyr/$id`}
      className="group"
      params={{ title: category.title, id: equipment.id }}
    >
      <div className="h-full bg-white p-3 rounded-lg shadow-[0px_10px_20px_rgba(190,190,190,0.3)]">
        <div className="grid md:grid-cols-2">
          <div>
            <img
              src={pb.files.getURL(equipment, equipment.images[0])}
              className="w-full h-48 object-contain rounded-lg"
            />
          </div>
          <div className="mt-4 md:mt-0">
            <p className="font-semibold group-hover:underline">
              {equipment.title}
            </p>
            <div className="mt-4 space-y-2">
              {Object.entries(equipment.spec)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key} className="flex">
                    <p className="text-sm font-semibold min-w-[135px]">
                      {key}:
                    </p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
