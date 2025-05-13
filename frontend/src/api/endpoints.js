import axios from "axios";
import { SERVER_URL } from "@/constants/constants";

const BASE_URL = SERVER_URL

const api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

api.interceptors.response.use(
    (response)=> response, 
    async (error) =>{
        const original_request = error.config

        if(error.response?.status === 401 && 
            !original_request._retry && 
            !original_request.url.includes('/token/refresh')
        ){
            original_request._retry = true;

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
    const response = await api.get(`/user_data/${username}/`)
    return response.data
}

async function refresh_token(){
    try {
        const response = await api.post('/token/refresh/')
        return response.data 
    } catch (error) {
        console.error("Token refresh failed", err);
    throw err;
    }
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

export async function get_auth(){
    const response = await api.get(`/authenticated/`)
    return response.data
}

export async function toggle_follow(username) {
    const response = await api.post('/toggle_follow/', {username: username})
    return response.data
}   

export async function get_users_posts(username){
    try {
        const response = await api.get(`/posts/${username}/`)
        return response.data
    } catch (error) {
        console.log("api :: get_users_posts :: error", error)
    }
}
export async function toggleLike(id) {
    const response = await api.post('/toggleLike/', {id:id})
    return response.data
}

export async function create_post(description) {
    const response =  await api.post('/create_post/', {description: description})
    return response.data
    
}

export async function get_posts(num) {
    const response = await api.get(`/get_posts/?page=${num}`)
    return response.data
}