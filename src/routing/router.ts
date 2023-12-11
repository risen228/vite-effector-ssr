import { createHistoryRouter, createRouterControls } from 'atomic-router'
import { home, test } from './routes'

const routes = [
  { path: '/', route: home },
  { path: '/test', route: test },
]

export const router = createHistoryRouter({
  routes,
  controls: createRouterControls(),
})
