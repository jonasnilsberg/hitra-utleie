import { createFileRoute } from '@tanstack/react-router'
import pb from '../../../../pocketbase'
import type { Equipment } from '../../../../types/equipment'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { useState } from 'react'

export const Route = createFileRoute('/kategorier/$title/utstyr/$id')({
  component: Equipment,
  loader: async ({ params }) => {
    const equipment = await pb.collection<Equipment>('equipment').getOne(params.id)
    return { equipment }
  }
})


function Equipment() {
  const { equipment } = Route.useLoaderData()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {equipment.images.map((image) => (
                  <Tab
                    key={image}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
                  >
                    <span className="sr-only">{image}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img alt="" src={pb.files.getURL(equipment, image)} className="size-full object-cover" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-primary"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {equipment.images.map((image) => (
                <TabPanel key={image}>
                  <img src={pb.files.getURL(equipment, image)} className="aspect-square w-full object-cover sm:rounded-lg" />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{equipment.title}</h1>

            {equipment.price && (
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-xl tracking-tight text-gray-900">{equipment.price}</p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="sr-only">Beskrivelse</h3>

              <div
                dangerouslySetInnerHTML={{ __html: equipment.description }}
                className="space-y-6 text-base text-gray-700"
              />
            </div>

            <div className="mt-10 flex">
              <button
                onClick={() => setOpen(true)}
                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white cursor-pointer hover:underline focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden sm:w-full"
              >
                Meld interesse
              </button>
            </div>

            <section aria-labelledby="details-heading" className="mt-2">
              <div className="divide-y divide-gray-200 border-t border-gray-200">
                <div>
                  <h3>
                    <p className="py-6 text-primary">
                      <span className="font-mono group-data-open:text-primary">
                        Detaljer
                      </span>
                    </p>
                  </h3>
                  <div className="pb-6">
                    <div className='grid grid-cols-3'>
                    </div>
                    <div className='space-y-2'>
                      {Object.entries(equipment.spec).map(([key, value]) => (
                        <div key={key} className="flex">
                          <div className="font-semibold text-sm">
                            <p className='min-w-[160px]'>
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </p>
                          </div>
                          <div>
                            <p className='text-sm'>
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <ShowInterestModal open={open} setOpen={setOpen} equipment={equipment} />
    </>
  )
}

interface ShowInterestModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  equipment: Equipment
}

function ShowInterestModal({ open, setOpen, equipment }: ShowInterestModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // Handle form submission logic here
    pb.collection('leads').create({
      name,
      email,
      phone,
      equipment: equipment.id
    }).then(() => {
      setOpen(false)
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form onSubmit={handleSubmit}>
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div>
                <div className="mt-3 sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Meld Interesse
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Fyll ut skjemaet under, så tar vi kontakt med deg!
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                      Navn
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Ditt navn"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className='mt-4'>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      E-postadresse
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="deg@hotmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className='mt-4'>
                    <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                      Telefonnummer
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+47 123 45 678"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs cursor-pointer hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
                  Send
                </button>
              </div>
            </DialogPanel>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

