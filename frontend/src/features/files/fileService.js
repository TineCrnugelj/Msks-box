import axios from 'axios'

const API_URL = '/api/tasks/'

const createFile = async (fileData, options, taskId) => {
    const response = await axios.post(API_URL + taskId + '/files', fileData, options)
    return response.data; 
}

const getFiles = async (taskId) => {
    const response = await axios.get(API_URL + taskId + '/files');

    return response.data;
}

const deleteFile = async (fileId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            ContentDisposition: 'attachment'
        }
    }
    const response = await axios.delete(API_URL + fileId, config);

    return response.data;
}

const downloadFile = async (fileId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'download/' + fileId, config);

    return response.data;
}

const fileService = {
    createFile,
    getFiles,
    deleteFile,
    downloadFile,
}

export default fileService;