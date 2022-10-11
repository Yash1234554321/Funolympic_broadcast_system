import axios from "axios"



//connecting with backend api
export const baseUrl = "http://127.0.0.1:8000"

export const register = async (registerDetails:any) => {
    const response = await axios.post(`${baseUrl}/register/`,registerDetails)
    return response
}

export const login = async (loginDetails:any) => {
    const response = await axios.post(`${baseUrl}/login/`,loginDetails)
    return response
}

// let token = JSON.parse(localStorage.getItem("token") || "{}");

export const changePassword = async (changePasswordDetails:any,token:any) => {
    
    const response = await axios.put(`${baseUrl}/change-password/`,changePasswordDetails, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    return response
}

export const livecomment = async (livecommentDetails:any) => {
    const response = await axios.post(`${baseUrl}/livecomments/`,livecommentDetails)
    return response
}

export const highlightcomment = async (highlightcommentDetails:any) => {
    const response = await axios.post(`${baseUrl}/highlightcomments/`,highlightcommentDetails)
    return response
}