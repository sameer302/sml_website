import {client} from '@/sanity/lib/client'

export default async function PublicationsPage() {
  const publications = await client.fetch(`
    *[_type == "publication"] | order(year desc){
      _id,
      title,
      authors,
      journal,
      year,
      link
    }
  `)

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Publications</h1>

      <ul className="space-y-4">
        {publications.map((p: any) => (
          <li key={p._id}>
            <p className="font-medium">{p.title}</p>
            <p className="text-sm">{p.authors}</p>
            <p className="text-sm text-gray-600">
              {p.journal} ({p.year})
            </p>
            {p.link && (
              <a href={p.link} className="text-blue-600 text-sm">
                View paper
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
