import { routes } from '../../routing'
import { RouteRecord } from '../../routing/types.ts'
import { HomePageView } from './page'

export const HomeRoute: RouteRecord = {
  route: routes.home,
  view: HomePageView,
}
