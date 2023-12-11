import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import sirv from 'sirv'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const paths = {
  serverEntry: path.join(__dirname, './server/entry-server.js'),
  indexHtml: path.join(__dirname, './client/index.html'),
  static: path.join(__dirname, './client'),
}

const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const PUBLIC_ENV = JSON.stringify(
  Object.entries(process.env).reduce((acc, [key, value]) => {
    if (!key.startsWith('PUBLIC_')) return acc
    acc[key] = value
    return acc
  }, {}),
)

const templateHtml = await fs.readFile(paths.indexHtml, 'utf-8')

const app = express()

app.use(base, sirv(paths.static, { extensions: [] }))

app.get('/health', async (req, res) => {
  res.json({ status: 'healthy' })
})

app.get('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    const serverEntry = await import(paths.serverEntry)
    const rendered = await serverEntry.render('/' + url, req.headers.cookie)

    const html = templateHtml
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(`{/* initial-values */}`, rendered.initialValues ?? '')
      .replace(`{/* env */}`, PUBLIC_ENV)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (error) {
    console.log(error.stack)
    res.status(500).end('Internal error')
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
