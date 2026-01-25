import {type SchemaTypeDefinition} from 'sanity'
import {person} from './person'
import {research} from './research'
import {publication} from './publication'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [person, research, publication],
}
