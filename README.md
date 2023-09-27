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

## License

[MIT](LICENSE) © Ismar Slomic

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
