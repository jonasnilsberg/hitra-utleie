import { createFileRoute } from '@tanstack/react-router'
import Container from '../components/Container'

export const Route = createFileRoute('/om-oss')({
  component: AboutUs,
})

function AboutUs() {
  return (
    <Container>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">

        <div>
          <div className="text-base/7 text-gray-700 lg:max-w-lg">
            <p className="text-base/7 font-semibold text-primary">Om oss</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Hitra Utleie AS
            </h1>
            <div className="max-w-xl">
              <p className="mt-6">
                Hitra Utleie AS ble etablert i 2025 med ett klart mål: å tilby pålitelig og kostnadseffektiv utleie av byggeutstyr til både profesjonelle entreprenører og private kunder. Vi forstår at riktig utstyr til rett tid kan avgjøre suksessen til ethvert byggeprosjekt.
              </p>
              <p className="mt-8">
                Vårt sortiment omfatter alt fra trucker og lifter til annet spesialisert byggeutstyr som dekker behovene til både store anleggsprosjekter og mindre hjemmeprosjekter. Vi er stolte av å levere godt vedlikeholdt utstyr som våre kunder kan stole på.
              </p>
              <p className="mt-8">
                Som et nyetablert selskap har vi friheten til å være fleksible og kundefokuserte i vår tilnærming. Vi bygger vårt rykte på pålitelighet, konkurransedyktige priser og personlig service. Hos oss møter du alltid folk som forstår bransjen og kan gi deg råd om hvilket utstyr som passer best til ditt prosjekt.
              </p>
              <p className="mt-8">
                Enten du er en erfaren entreprenør som trenger utstyr til et større anleggsprosjekt, eller en privatperson som skal renovere hjemme, er vi her for å hjelpe deg med å få jobben gjort – trygt og effektivt.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:pr-4">
          <div className="relative overflow-hidden rounded-3xl px-6 pt-64 pb-9 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
            <img
              alt=""
              src="/om-oss-stock.jpg"
              className="absolute inset-0 size-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
