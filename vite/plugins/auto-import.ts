import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
      // '@vueuse/core',
      {
        '@vueuse/core': [
          // named imports
          'useMouse', // import { useMouse } from '@vueuse/core',
          'useStorage',
          // alias
          ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
        ],
      },
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: [
      './src/utils/composables/**',
    ],
  })
}
