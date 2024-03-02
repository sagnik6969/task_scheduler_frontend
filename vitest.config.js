import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      server: {
        deps: {
          inline: ['vuetify']
        }
      },
      globals: true, // => it is important => if we disable this option vitest will give unexpected results
      // so that we don't need to import vitest in every test file
      //   setupFiles: [
      // './setupTest.js'
      // so that we don't need to include the files
      // in that we don't need to expect.extend(matchers) in every file
      //   ],
      coverage: {
        enabled: false,
        // if enabled is true then it will generate a coverage report in every test
        //when enabled: false =>  we can run coverage test by passing --coverage
        provider: 'istanbul'
      }
    }
  })
)
