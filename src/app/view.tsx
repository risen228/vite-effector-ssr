import { RouterProvider } from 'atomic-router-react'
import { PageViews } from '../pages'
import { router } from '../routing'
import { env } from '../shared/env.ts'

export const AppView = () => {
  console.log('Example env:', env.example)

  return (
    <RouterProvider router={router}>
      <PageViews />
    </RouterProvider>
  )
}
