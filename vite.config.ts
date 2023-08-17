import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import svgLoader from 'vite-svg-loader'
import { sentryVitePlugin } from '@sentry/vite-plugin'

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      svgLoader({ defaultImport: 'url' }),
      sentryVitePlugin({
        org: env.VITE_SENTRY_ORG,
        project: env.VITE_SENTRY_PROJECT,
        telemetry: false,
        url: env.VITE_SENTRY_URL,
        include: './dist',
        ignore: ['node_modules', 'vite.config.ts'],
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        release: env.VITE_APP_VERSION,
        urlPrefix: '~/'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build: {
      sourcemap: 'hidden'
    },
    define: viteEnv
  }
})
