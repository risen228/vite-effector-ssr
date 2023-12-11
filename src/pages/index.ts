import { createRoutesView } from 'atomic-router-react'
import { HomeRoute } from './home'
import { TestRoute } from './test'

export const PageViews = createRoutesView({
  routes: [HomeRoute, TestRoute],
})
