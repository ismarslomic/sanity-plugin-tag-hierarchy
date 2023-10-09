import {ListItemBuilder, StructureBuilder} from 'sanity/lib/exports/desk'
import {DocumentStore, Slug} from 'sanity'
import {FolderIcon, TagIcon} from '@sanity/icons'
import {map} from 'rxjs'
import {tagType} from '../schemas/tag'

/**
 * Create a List Item for Parent tags (tags without a parent)
 * @param S
 */
const createListForParentTags = (S: StructureBuilder): ListItemBuilder => {
  const filter: string = `_type == "${tagType.name}" && !defined(parent)`

  return S.listItem()
    .title('Top level tags')
    .icon(FolderIcon)
    .schemaType(tagType.name)
    .child(() =>
      S.documentTypeList(tagType.name)
        .title('Top level tags')
        .defaultOrdering([{field: 'value.current', direction: 'asc'}])
        .filter(filter)
        // Use this list for creating from parents menu
        .canHandleIntent((intentName, params) => {
          return intentName === 'create' && params.template === 'tag'
        })
        .child((id: string) => S.document().documentId(id).schemaType(tagType.name)),
    )
}

/**
 * Create a List Item for Child tags (tags with a parent)
 * @param S
 * @param parent
 */
const createListForChildTags = (
  S: StructureBuilder,
  parent: {_id: string; value: Slug},
): ListItemBuilder => {
  const schemaType = tagType.name

  return S.listItem({
    id: parent._id,
    title: parent.value ? (parent.value.current as string) : undefined,
    schemaType,
    child: () =>
      S.documentTypeList(tagType.name)
        .title(`Child tags for ${parent.value.current}`)
        .defaultOrdering([{field: 'value.current', direction: 'asc'}])
        .filter('_type == "tag" && parent._ref == $parentId')
        .params({parentId: parent._id})
        .canHandleIntent(
          (intentName, params) => intentName === 'create' && params.template === 'tag-child',
        )
        .initialValueTemplates([
          S.initialValueTemplateItem('tag-child', {
            parentId: parent._id,
          }),
        ]),
  })
}

export default (
  S: StructureBuilder,
  documentStore: DocumentStore,
  title: string,
): ListItemBuilder => {
  const schemaType: string = tagType.name
  const filter = `_type == "${schemaType}" && !defined(parent) && !(_id in path("drafts.**"))`
  const query = `*[${filter}]{ _id, value } | order(value.current asc)`
  const options = {apiVersion: `2023-06-21`}

  return S.listItem()
    .title(title)
    .icon(TagIcon)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents: [{_id: string; value: Slug}]) => {
          return S.list()
            .title('Tags')
            .items([
              createListForParentTags(S),
              S.divider(),
              ...parents.map((parent): ListItemBuilder => {
                return createListForChildTags(S, parent)
              }),
            ])
        }),
      ),
    )
}
