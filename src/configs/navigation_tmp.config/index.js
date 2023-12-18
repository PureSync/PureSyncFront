import dashboardNavigationConfig from './dashboard.navigation.config'
import bodyNavigationConfig from './body.navigation.config'
import heartNavigationConfig from './heart.navigation.config'
import boardNavigationConfig from './board.navigation.config'

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const navigationConfig = [
    ...dashboardNavigationConfig,
    ...bodyNavigationConfig,
    ...heartNavigationConfig,
    ...boardNavigationConfig,
]

export default navigationConfig
