export default ({ route, redirect }) => {
  if (!route.path.endsWith('/'))
    redirect(301, route.path + '/')
}
