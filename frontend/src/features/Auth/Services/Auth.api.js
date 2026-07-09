import axios from "axios";


const authApi = axios.create({
    baseURL : "/api/auth",
    withCredentials : true
})


export async function register({username , email , password}) {
    
    const response = await authApi.post("/register",{
        username , email , password
    })

    return response.data;
}

export async function login({email , password}) {
    
    const response = await authApi.post("/login",{
        email , password
    })

    return response.data;
}

export async function getMe() {
    const response = await authApi.get("/getme");
    return response.data;
}

export async function logout() {
    const response = await authApi.post("/logout");
    return response.data;
}