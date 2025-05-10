import axios from "axios";
import { SERVER_URL } from "@/constants/constants";

const BASE_URL = SERVER_URL

const api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

api.interceptors.response.use(
    (response)=> response, 
    async error =>{
        const original_request = error.config

        if(error.response?.status === 401 && !original_request._retry){
            original_request._retry = true

            try{
                await refresh_token();
                return api(original_request);
            } catch (refreshError) {
                window.location.href='/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export async function get_user_profile_data(username){
    const response = await api.get(`/user_data/${username}/`,{withCredentials:true})
    return response.data
}

async function refresh_token(){
    const response = await api.post('/token/refresh/')
    return response.data
} 

export async function login(username, password){
    const response = await api.post('/token/', {
        username,
        password
    })
    return response.data
} 

export async function register(username, email, firstName, lastName, password){
    const response = await api.post('/register/', {
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
    })
    return response.data
} 