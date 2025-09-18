import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'


export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className='min-h-[calc(100vh-136px-344px)] bg-primary-background w-full'>
        <Outlet />
      </div>
      <Footer />
    </>
  ),
})
