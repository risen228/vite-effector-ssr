import { Link } from 'atomic-router-react'
import { routes } from '../../routing'

export const TestPageView = () => {
  console.log('Test Page Render')

  return (
    <div>
      <h1>Test Page</h1>
      <Link to={routes.home}>Home</Link>
    </div>
  )
}
