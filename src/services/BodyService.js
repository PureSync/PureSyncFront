import ApiService from './ApiService'



export async function apiGetSleepCalendar() {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/sleep`,
        method: 'get',

    })
}

export async function apiPostSleepCalendar(data) {
  return ApiService.fetchData({
      url: process.env.REACT_APP_HOST_URL + `/api/sleep`,
      method: 'post',
      data: data,
      headers : {
        'Content-Type': 'application/json', 
      }
  })
}

export async function apiPutSleepCalendar(params,data) {
  return ApiService.fetchData({
      url: process.env.REACT_APP_HOST_URL + `/api/sleep/${params}`,
      method: 'put',
      data: data,
      headers : {
        'Content-Type': 'application/json', 
      }
  })
}

export async function apiDeleteSleepCalendar(params) {
  return ApiService.fetchData({
      url: process.env.REACT_APP_HOST_URL + `/api/sleep/${params}`,
      method: 'delete',
  })
}