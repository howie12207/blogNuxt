import { Middleware } from '@nuxt/types'

const metaCheck: Middleware = ({ store, route, redirect }) => {
  route.meta?.forEach(() => {
    if (route.path.includes('backstage') && !store.state.user.login)
      return redirect('/')
  })
}

export default metaCheck
