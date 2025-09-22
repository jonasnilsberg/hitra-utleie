import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="text-center py-16 lg:py-32">
      <p className="text-base font-semibold text-primary">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Denne siden ble ikke funnet.
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Beklager, vi finner ikke siden du leter etter. Kanskje du kan finne det
        du leter etter ved å gå tilbake til forsiden.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Ta meg til forsiden
        </Link>
      </div>
    </div>
  )
}

