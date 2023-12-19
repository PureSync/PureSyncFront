import ApiService from './ApiService'
import Axios from 'axios'

export async function apiSignIn(data) {

    return ApiService.fetchData({
        url: 'http://localhost:9000/api/member/login',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    const GET_URL = `http://localhost:9000/api/member/searchId/${data.email}`;
    try{
        const response = await Axios.get(GET_URL)
        return response;
    }catch(e){
        return e;
    }
}

export async function apiResetPassword(data) {
    console.log(data)
    const POST_URL = `http://localhost:9000/api/member/searchPassword`
   try{
    const response = await Axios.post(POST_URL,data);
    return response
   }catch(e){
    console.log(e);
    return e;
   }
}