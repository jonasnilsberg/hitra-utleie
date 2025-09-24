import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NotFound from '../components/404'
import Analytics from '../components/Analytics'

export const Route = createRootRoute({
  notFoundComponent: () => (
    <>
      <NotFound />
    </>
  ),
  component: () => (
    <>
      <Analytics />
      <Header />
      <div className="min-h-[calc(100vh-136px-344px)] bg-primary-background w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  ),
})
