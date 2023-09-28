import {definePlugin} from 'sanity'
import {tagType} from './schemas/tag'

interface TagHierarchyConfig {}
export const tagHierarchy = definePlugin<TagHierarchyConfig | void>((config = {}) => {
  return {
    name: 'sanity-plugin-tag-hierarchy',
    schema: {
      types: [tagType],
    },
  }
})
