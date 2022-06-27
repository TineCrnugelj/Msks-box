import axios from 'axios'

const API_URL = '/api/files/'

const createFile = async (fileData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, fileData, config)

    return response.data; 
}

const fileService = {
    createFile,
}

export default fileService