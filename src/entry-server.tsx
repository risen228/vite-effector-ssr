import { allSettled, fork, serialize } from 'effector'
import { Provider } from 'effector-react'
import { createMemoryHistory } from 'history'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { AppView } from './app/view'
import { router } from './routing'

export async function render(url: string) {
  const scope = fork()

  const history = createMemoryHistory({ initialEntries: [url] })
  await allSettled(router.setHistory, { scope, params: history })

  const html = ReactDOMServer.renderToString(
    <Provider value={scope}>
      <AppView />
    </Provider>,
  )

  const initialValues = JSON.stringify(serialize(scope))

  return { html, initialValues }
}
