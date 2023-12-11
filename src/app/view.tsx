import { RouterProvider } from 'atomic-router-react'
import { PageViews } from '../pages'
import { router } from '../routing'

export const AppView = () => {
  return (
    <RouterProvider router={router}>
      <PageViews />
    </RouterProvider>
  )
}
