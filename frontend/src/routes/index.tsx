import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import pb from '../pocketbase'
import { Button } from '../components/catalyst/button'
import { Textarea } from '../components/catalyst/textarea'

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const categories = await pb.collection('categories').getFullList()
    const users = await pb.collection('users').getFullList()
    return { categories, users }
  }
})

function App() {
  const postsRes = Route.useLoaderData();
  const categories = postsRes.categories;

  console.log('categories', categories);
  console.log('users', postsRes.users);

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <Textarea />
      <Button>Testing</Button>
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        {categories.map((category: any) => (
          <p key={category.id} className='text-white'>{category.title}</p>
        ))}
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload 123456.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
