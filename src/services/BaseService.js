import axios from 'axios'
import appConfig from 'configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import store from '../store'
import { onSignOutSuccess } from '../store/auth/sessionSlice'
import ApiService from './ApiService'
import getCookie from './getCookie'

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 60000,
    baseURL: process.env.REACT_APP_HOST_URL + appConfig.apiPrefix,
})

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)
        let accessToken = getCookie("access_token");
        // let accessToken = persistData.auth.session.token
        // console.log(accessToken);
        
        if (!accessToken) {
            const { auth } = store.getState()
            accessToken = auth.session.token
        }

        if (accessToken) {
            // 액세스 토큰이 있는경우 axios header에 쿠키 추가함
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(onSignOutSuccess())
        }

        return Promise.reject(error)
    }
)

// 23-12-16 성언 임시주석 이동필요 
// export async function getboardFile (boardSeq) {
//     return ApiService.fetchData({
//         url: 'http://localhost:9000/api/board/${boardSeq}/file',
//         method: 'get'
//     })
// }

export default BaseService


