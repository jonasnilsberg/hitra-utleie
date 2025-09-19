import { createFileRoute } from '@tanstack/react-router'
import Container from '../components/Container'

export const Route = createFileRoute('/om-oss')({
  component: AboutUs,
})

function AboutUs() {
  return (
    <Container>Hva skal det stå her? Og hvilke bilder vil dere ha?</Container>
  )
}
