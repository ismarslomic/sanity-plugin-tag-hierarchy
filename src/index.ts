import {definePlugin} from 'sanity'
import {tagType} from './schemas/tag'
import createDeskHierarchy from './desk/createDeskHierarchy'
import {tagChildTemplate} from './init-value-templates/tagChildTemplate'

interface TagHierarchyConfig {}

export const tagHierarchy = definePlugin<TagHierarchyConfig | void>(() => {
  return {
    name: 'sanity-plugin-tag-hierarchy',
    schema: {
      types: [tagType],
      templates: (prev) => {
        return [...prev, tagChildTemplate]
      },
    },
  }
})

export {createDeskHierarchy}
