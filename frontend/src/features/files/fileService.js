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

const getFiles = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);

    return response.data;
}

const deleteFile = async (fileId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + fileId, config);

    return response.data;
}

const fileService = {
    createFile,
    getFiles,
    deleteFile,
}

export default fileService;