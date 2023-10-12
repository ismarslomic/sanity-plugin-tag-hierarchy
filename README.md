# sanity-plugin-tag-hierarchy

[![CI & Release](https://github.com/ismarslomic/sanity-plugin-tag-hierarchy/actions/workflows/main.yml/badge.svg)](https://github.com/ismarslomic/sanity-plugin-tag-hierarchy/actions/workflows/main.yml)
> This is a **Sanity Studio v3** plugin.

A multi-tag input supporting tag hierarchy (max 2 levels), grouping tagged documents in Desk tool and browsing documents by tags in the Studio.

## Installation

```sh
npm install @ismarslomic/sanity-plugin-tag-hierarchy
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import { defineConfig } from 'sanity'
import { tagHierarchy } from '@ismarslomic/sanity-plugin-tag-hierarchy'

export default defineConfig({
  //...
  plugins: [tagHierarchy({})],
})
```

### Parent/child tags
This plugin supports tag hierarchy of 2 levels: **Parent** and **Child**.

A "**Parent**" Tag is any tag document that does not have the parent field defined.

A "**Child**" Tag is any tag document with a parent field reference.

### Add tag input to schema
Allow selecting multiple tags, but only child tags:
```ts
defineField({
  name: 'tags',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: {type: 'tag'},
      options: {
        filter: 'defined(parent)',
        disableNew: true,
      },
    }
  ]
})
```
#### Screenshot: Tag reference in Post document
![tag-reference.png](doc/tag-reference.png)

### Add Parent-Child tag structure in Desk

In order to hide the default structure in Desk for Tag and in stead use provided Tag hierarchy structure providrd by
this plugin you can add following configuration in the `sanity.config.ts` (or .js):
```ts
import { createDeskHierarchy } from '@ismarslomic/sanity-plugin-tag-hierarchy'

export default defineConfig({
  plugins: [
    deskTool({
      structure: (S: StructureBuilder, context: StructureResolverContext) => {
        const settingsListItem: ListItemBuilder =
          S.listItem()
            .title(settingsType.title)
            .icon(settingsType.icon)
            .child(
              S.editor()
                .id(settingsType.name)
                .schemaType(settingsType.name)
                .documentId(settingsType.name)
            )

        const defaultListItems: ListItemBuilder[] = S.documentTypeListItems().filter(
          (listItem) => (listItem.getId() !== settingsType.name) && (!['tag'].includes(listItem.getId()))
        )

        return S.list()
          .title('Content')
          .items([
            settingsListItem,
            S.divider(),
            ...defaultListItems,
            S.divider(),
            createDeskHierarchy(S, context.documentStore, 'Tags')
          ])
      },
    }),
  ]
})
```

Note that the example above is based on the Sanity template
[Blog with Built-in Content Editing](https://www.sanity.io/templates/blog-with-built-in-content-editing). You need to
adjust the desk structure items according to your needs.

#### Screenshot: Parent tag structure in Sanity Desk
![tag-reference.png](doc/parent-tag-structure.png)

#### Screenshot: Child tag structure in Sanity Desk
![tag-reference.png](doc/child-tag-structure.png)

## License

[MIT](LICENSE) © Ismar Slomic

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

We use the [Sanity semantic-release](https://github.com/sanity-io/plugin-kit/blob/main/docs/semver-workflow.md) to 
automate publish to NPM. 

Run ["CI & Release" workflow](https://github.com/ismarslomic/sanity-plugin-tag-hierarchy/actions/workflows/main.yml).

Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
