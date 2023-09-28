# sanity-plugin-tag-hierarchy

> This is a **Sanity Studio v3** plugin.

A multi-tag input supporting tag hierarchy, grouping tagged documents in Desk tool and browsing documents by tags in the Studio.

## Installation

```sh
npm install sanity-plugin-tag-hierarchy
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {tagHierarchy} from 'sanity-plugin-tag-hierarchy'

export default defineConfig({
  //...
  plugins: [tagHierarchy({})],
})
```

### Parent/child tags
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

## License

[MIT](LICENSE) © Ismar Slomic

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
