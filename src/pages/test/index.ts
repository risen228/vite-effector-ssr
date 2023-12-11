import { routes } from '../../routing'
import { RouteRecord } from '../../routing/types.ts'
import { TestPageView } from './page'

export const TestRoute: RouteRecord = {
  route: routes.test,
  view: TestPageView,
}
