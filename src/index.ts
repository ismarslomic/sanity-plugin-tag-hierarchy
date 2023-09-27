import {definePlugin} from 'sanity'

interface MyPluginConfig {
  /* nothing here yet */
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {tagHierarchy} from 'sanity-plugin-tag-hierarchy'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [tagHierarchy()],
 * })
 * ```
 */
export const tagHierarchy = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-tag-hierarchy')
  return {
    name: 'sanity-plugin-tag-hierarchy',
  }
})
