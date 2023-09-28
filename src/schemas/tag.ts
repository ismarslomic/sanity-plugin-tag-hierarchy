import {defineField, defineType, Slug} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {TAG_DOCUMENT_NAME} from '../constants'

export const tagType = defineType({
  name: TAG_DOCUMENT_NAME,
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'slug', // make sure tag value is unique
      description: 'The value of the tag, keep it short!',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent tag',
      type: 'reference',
      description: 'The parent tag, if any',
      to: [{type: TAG_DOCUMENT_NAME}],
      // This ensures we cannot select other "tag children"
      options: {
        filter: ({document}) => {
          const tagValue: Slug | unknown = document.value

          // check if tag value is present first (typically during draft)
          if (!tagValue) {
            return {
              filter: '!defined(parent) && value != null',
            }
          }
          // don't show tag of current document and tags with parents (children)
          return {
            filter: '!defined(parent) && value != null && value.current != $value',
            params: {value: (tagValue as Slug).current},
          }
        },
      },
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      value: 'value',
      parentValue: 'parent.value',
    },
    prepare: ({value, parentValue}) => ({
      title: value?.current,
      subtitle: parentValue ? `– ${parentValue.current}` : ``,
    }),
  },
})
