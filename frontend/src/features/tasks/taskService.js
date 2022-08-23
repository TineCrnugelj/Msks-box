import axios from "axios";

const API_URL = '/api/tasks/'

const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, taskData, config)

    return response.data;
}

const getTasks = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data;
}

const getTask = async (taskId) => {
    const response = await axios.get(API_URL + taskId);
    return response.data;
}

const isLocked = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + 'isLocked/' + taskId, config)
    return response.data;
}

const lockTask = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + 'lock/' + taskId, config)

    return response.data;
}

const unlockTask = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + 'unlock/' + taskId, config)

    return response.data;
}

const deleteTask = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + taskId, config)

    return response.data;
}

const updateTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const { id } = taskData;
    const response = await axios.put(API_URL + id, taskData, config)

    return response.data;
}

const getTaskByTag = async (tag, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + `find?tag=${tag}`, config)
    return response.data;
}

const getDataToPlot = async (taskId) => {
    const response = await axios.get(`${API_URL}/${taskId}/plots`);
    return response.data;
}

const putEditTag = async (taskId, tag) => {
    const response = await axios.put(`${API_URL}/${taskId}/tag`, {tag: tag});
    return response.data;
}

const taskService = {
    createTask,
    getTasks,
    getTask,
    lockTask,
    unlockTask,
    deleteTask,
    updateTask,
    isLocked,
    getTaskByTag,
    getDataToPlot,
    putEditTag,
}

export default taskService