import {client} from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'

export default async function ResearchPage() {
  const research = await client.fetch(`
    *[_type == "research"]{
      _id,
      title,
      description,
      image
    }
  `)

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Research</h1>

      <div className="space-y-6">
        {research.map((r: any) => (
          <div key={r._id} className="border p-4 rounded">
            {r.image && (
              <img
                src={urlFor(r.image).width(400).url()}
                alt={r.title}
                className="mb-3 rounded"
              />
            )}
            <h2 className="font-semibold">{r.title}</h2>
            <p className="text-sm text-gray-700">{r.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
