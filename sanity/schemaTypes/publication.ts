import {defineType, defineField} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publications',
  type: 'document',
  fields: [
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
    }),
    defineField({
      name: 'journal',
      title: 'Journal / Conference',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'link',
      title: 'Paper Link',
      type: 'url',
    }),
  ],
})
