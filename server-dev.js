import dotenv from 'dotenv'
import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import { createServer } from 'vite'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

function root(pathEnd) {
  return path.join(__dirname, pathEnd)
}

const paths = {
  serverEntry: path.join(__dirname, './src/entry-server.tsx'),
  indexHtml: path.join(__dirname, './index.html'),
}

const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const files = [
  {
    path: root('.env'),
    condition: () => true,
  },
  {
    path: root('.env.development'),
    condition: () => process.env.NODE_ENV === 'development',
  },
  {
    path: root('.env.production'),
    condition: () => process.env.NODE_ENV === 'production',
  },
  {
    path: root('.env.local'),
    condition: () => process.env.NODE_ENV !== 'production',
  },
]

const envs = {}

for (const file of files) {
  if (!file.condition()) continue
  dotenv.config({ path: file.path, processEnv: envs })
}

dotenv.populate(process.env, envs)

const PUBLIC_ENV = JSON.stringify(
  Object.entries(process.env).reduce((acc, [key, value]) => {
    if (!key.startsWith('PUBLIC_')) return acc
    acc[key] = value
    return acc
  }, {}),
)

const app = express()

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  base,
})

app.use(vite.middlewares)

app.get('/health', async (req, res) => {
  res.json({ status: 'healthy' })
})

app.get('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template = await fs.readFile(paths.indexHtml, 'utf-8')
    template = await vite.transformIndexHtml(url, template)

    const serverEntry = await vite.ssrLoadModule(paths.serverEntry)
    const rendered = await serverEntry.render('/' + url, req.headers.cookie)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(`{/* initial-values */}`, rendered.initialValues ?? '')
      .replace(`{/* env */}`, PUBLIC_ENV)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (error) {
    vite?.ssrFixStacktrace(error)

    console.log(error.stack)
    res.status(500).end(error.stack)
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
