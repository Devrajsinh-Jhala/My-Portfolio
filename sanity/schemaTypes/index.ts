import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { researchType } from './research'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [researchType, blockContentType, categoryType, postType, authorType],
}
