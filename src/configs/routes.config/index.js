import authRoute from './authRoute'
import appsRoute from './appsRoute'
import pagesRoute from './pagesRoute'
import docsRoute from './docsRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...appsRoute,
    ...pagesRoute,
    ...docsRoute,
]
