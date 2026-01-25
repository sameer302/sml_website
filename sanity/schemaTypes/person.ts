import {defineType, defineField} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'People',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: ['PI', 'PhD Student', 'Masters Student', 'Undergraduate', 'Alumni'],
      },
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
    }),
  ],
})
