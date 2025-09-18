import { createFileRoute, Link } from '@tanstack/react-router'
import pb from '../pocketbase'
import TypeWriter from 'typewriter-effect'

export const Route = createFileRoute('/')({
  component: Homepage,
  loader: async () => {
    const categories = await pb.collection('categories').getFullList()
    const users = await pb.collection('users').getFullList()
    return { categories, users }
  }
})

function Homepage() {
  return (
    <div className='w-full'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <div className='grid gap-8 md:gap-0 md:grid-cols-2 w-full'>
          <div className='justify-center mt-20'>
            <div className='flex justify-center'>
              <img
                alt=""
                src="/Logo.svg"
                className="h-40 md:h-80 w-auto"
              />
            </div>
            <div>
              <p className='text-center font-mono'>Hitra Utleie AS tilbyr leie av maskiner og utstyr til profesjonelle aktører i byggebransjen og til privatmarkedet</p>
            </div>
            <div className='flex justify-center mt-12'>
              <Link
                to='/kategorier'
                className="flex text-[24px] max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white cursor-pointer hover:underline focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden sm:w-full"
              >
                Se vårt utstyr
              </Link>
            </div>
          </div>
          <div className='md:flex justify-center'>
            <div className='w-full md:ml-12 lg:ml-28 h-[400px] md:h-[800px] bg-primary'>
              <div className='w-full h-full flex justify-center items-center'>
                <p className='text-white font-bold text-[40px] md:text-[70px] text-center px-6'>
                <TypeWriter options={{
                  strings: ['Lei maskiner og utstyr', 'Enkelt og rimelig', 'For proffe og private'],
                  autoStart: true,
                  loop: true,
                }} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
        </div>
      </div>
    </div>


  )
}
