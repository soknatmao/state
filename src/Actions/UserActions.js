import axios from "axios"

const BASE_URL = 'https://api.escuelajs.co/api/v1/'
/// MARK: insert product to api
export const createUser = async (user) => {
    const resp = await fetch(`${BASE_URL}/users`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    return resp.json()
}


export const getCategories = async () => {
    const resp = await fetch(`${BASE_URL}categories`)
    return resp.json()
}
// Mark: Upload image

export const uploadImage = async (Image) => {
    const response = await axios({
        method: "POST",
        url: `${BASE_URL}files/upload`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "multipart/form-data",
            

        },
        data: Image
    })
return response
}
