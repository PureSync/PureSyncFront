import ApiService from './ApiService'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'

const access_token = getHeaderCookie();
let parse_token = parseJwt(access_token);

export async function apiGetSleepCalendar() {
    return ApiService.fetchData({
        url: 'http://localhost:9000/api/sleep/list',
        method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    });
}