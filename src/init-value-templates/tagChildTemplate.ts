import {tagType} from '../schemas/tag'

export const tagChildTemplate = {
  id: 'tag-child',
  title: 'Child tag',
  schemaType: tagType.name,
  parameters: [{name: `parentId`, title: `Parent ID`, type: `string`}],
  // This value will be passed-in from desk structure
  value: ({parentId}: {parentId: string}): {parent: object} => ({
    parent: {_type: 'reference', _ref: parentId},
  }),
}
