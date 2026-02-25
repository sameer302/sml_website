import { client } from '@/sanity/lib/client'
import PublicationsClient from './PublicationsClient'

export const metadata = {
  title: 'Publications | Sensing & Monitoring Lab',
  description: 'Peer-reviewed journal articles, conference papers and preprints from the Sensing & Monitoring Lab, IIT Bombay.',
}

export default async function PublicationsPage() {
  const publications = await client.fetch(`
    *[_type == "publication"] | order(featured desc, year desc) {
      _id, title, authors, type, journal, volume, pages,
      year, link, doi, arxivId, abstract, tags, featured
    }
  `)

  return <PublicationsClient publications={publications} />
}