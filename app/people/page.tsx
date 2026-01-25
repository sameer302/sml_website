import {client} from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'

export default async function PeoplePage() {
  const people = await client.fetch(`
    *[_type == "person"]{
      _id,
      name,
      role,
      email,
      bio,
      photo
    }
  `)

  const pi = people.find((p: any) => p.role === 'PI')
  const others = people.filter((p: any) => p.role !== 'PI')

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-8">People</h1>

      {/* PI SECTION */}
      {pi && (
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          {pi.photo && (
            <img
              src={urlFor(pi.photo).width(200).height(200).url()}
              className="rounded-full"
              alt={pi.name}
            />
          )}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">{pi.name}</h2>
            <p className="text-gray-600">{pi.role}</p>
            {pi.bio && <p className="mt-2 max-w-xl">{pi.bio}</p>}
          </div>
        </div>
      )}

      {/* OTHER MEMBERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {others.map((p: any) => (
          <div key={p._id} className="text-center">
            {p.photo && (
              <img
                src={urlFor(p.photo).width(180).height(180).url()}
                className="mx-auto rounded-full mb-3"
                alt={p.name}
              />
            )}
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.role}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
