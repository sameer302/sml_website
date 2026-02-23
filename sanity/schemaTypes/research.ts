import { defineType, defineField } from 'sanity'

export const research = defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    // ── CORE ──
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "AI-enabled Portable Oral Camera for OPMD Detection"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Research Area',
      type: 'string',
      description: 'Broad category this project belongs to.',
      options: {
        list: [
          { title: 'Oral Health Diagnostics', value: 'oral-health' },
          { title: 'Non-invasive Screening', value: 'non-invasive-screening' },
          { title: 'Physiological Monitoring', value: 'physiological-monitoring' },
          { title: 'Acoustic Biomarkers', value: 'acoustic-biomarkers' },
          { title: 'Neonatal Monitoring', value: 'neonatal-monitoring' },
          { title: 'Edge Deployment & Other', value: 'edge-other' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'ongoing',
      validation: Rule => Rule.required(),
    }),

    // ── CONTENT ──
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on cards and listings.',
      validation: Rule => Rule.required().max(300),
    }),
    defineField({
      name: 'motivation',
      title: 'Motivation / Problem Statement',
      type: 'text',
      rows: 4,
      description: 'Why does this problem matter? Who does it affect?',
    }),
    defineField({
      name: 'approach',
      title: 'Our Approach',
      type: 'text',
      rows: 4,
      description: 'What methods, algorithms, or devices are used?',
    }),
    defineField({
      name: 'outcomes',
      title: 'Key Outcomes / Results',
      type: 'array',
      description: 'Bullet-point achievements or results.',
      of: [{ type: 'string' }],
    }),

    // ── MEDIA ──
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Additional images — prototypes, results, diagrams.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    // ── METADATA ──
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'e.g. "Deep Learning", "mHealth", "Wearables"',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      description: 'People working on this project.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
    }),
    defineField({
      name: 'relatedPublications',
      title: 'Related Publications',
      type: 'array',
      description: 'Link publications from this project.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'publication' }],
        },
      ],
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
      validation: Rule => Rule.min(2000).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first on the page.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      area: 'area',
      status: 'status',
      media: 'image',
    },
    prepare({ title, area, status, media }) {
      return {
        title,
        subtitle: `${area ?? '—'} · ${status ?? '—'}`,
        media,
      }
    },
  },
})