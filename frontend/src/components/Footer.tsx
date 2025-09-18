import { Link } from "@tanstack/react-router"

const navigation = {
  main: [
    { name: 'Utstyr', href: '/kategorier' },
    { name: 'Om Oss', href: '/om-oss' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Hitra-Utleie-As/61580066511844/?mibextid=wwXIfr&rdid=ULJYAtgNw3qtRrc7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14wagnTcYg%2F%3Fmibextid%3DwwXIfr',
      icon: (props: { className: string }) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
} as const

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
          {navigation.main.map((item) => (
            <Link key={item.name} to={item.href} className="text-gray-600 hover:text-gray-900">
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-600">&copy; 2025 Hitra Utleie AS</p>
      </div>
    </footer>
  )
}
