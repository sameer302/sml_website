import { defineType, defineField } from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publications',
  type: 'document',
  fields: [

    // ── CORE ──
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'string',
      description: 'Full author list as it appears in the paper. e.g. "Khan Z., Goswami B., Punjabi N."',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          { title: 'Journal Article', value: 'journal' },
          { title: 'Conference Paper', value: 'conference' },
          { title: 'Workshop Paper', value: 'workshop' },
          { title: 'Preprint', value: 'preprint' },
          { title: 'Thesis', value: 'thesis' },
          { title: 'Book Chapter', value: 'book-chapter' },
        ],
        layout: 'radio',
      },
      initialValue: 'journal',
      validation: Rule => Rule.required(),
    }),

    // ── VENUE ──
    defineField({
      name: 'journal',
      title: 'Journal / Conference Name',
      type: 'string',
      description: 'e.g. "IEEE Transactions on Biomedical Engineering" or "EMBC 2024"',
    }),
    defineField({
      name: 'volume',
      title: 'Volume / Issue',
      type: 'string',
      description: 'e.g. "Vol. 12, No. 3" — for journal articles.',
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'string',
      description: 'e.g. "pp. 123–130"',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().min(2000).max(new Date().getFullYear() + 1),
    }),

    // ── IDENTIFIERS ──
    defineField({
      name: 'link',
      title: 'Paper Link',
      type: 'url',
      description: 'URL to the paper — IEEE, Springer, arXiv, etc.',
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'e.g. "10.1109/TBME.2023.123456"',
    }),
    defineField({
      name: 'arxivId',
      title: 'arXiv ID',
      type: 'string',
      description: 'e.g. "2301.12345" — if available as a preprint.',
    }),

    // ── METADATA ──
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 5,
      description: 'Optional — shown when user expands the entry.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Research area tags. e.g. "Oral Health", "Deep Learning", "mHealth"',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this to the top of the publications list.',
      initialValue: false,
    }),

  ],

  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      year: 'year',
      type: 'type',
    },
    prepare({ title, authors, year, type }) {
      return {
        title,
        subtitle: `${year ?? '—'} · ${type ?? '—'} · ${authors ?? ''}`,
      }
    },
  },
})