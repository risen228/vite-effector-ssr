import { Link } from 'atomic-router-react'
import { routes } from '../../routing'

export const HomePageView = () => {
  console.log('Home Page Render')

  return (
    <div>
      <h1>Home Page</h1>
      <Link to={routes.test}>Test</Link>
    </div>
  )
}
