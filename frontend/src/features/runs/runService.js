import axios from "axios";

const API_URL = '/api/tasks/'

// Create new run
const createRun = async (runData, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, runData, config)

    return response.data;
}

// Get all runs
const getRuns = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data;
}

// Get run by id
const getRun = async (runId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + runId, config)
    return response.data;
}

const lockRun = async (runId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + 'lock/' + runId, config)

    return response.data;
}

const unlockRun = async (runId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + 'unlock/' + runId, config)

    return response.data;
}

const deleteRun = async (runId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + runId, config)

    return response.data;
}

const updateRun = async (runData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const { id } = runData;
    const response = await axios.put(API_URL + id, runData, config)

    return response.data;
}

const getRunByTag = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'find', config)
    return response.data;
}

const runService = {
    createRun,
    getRuns,
    getRun, 
    lockRun,
    unlockRun,
    deleteRun,
    updateRun,
    getRunByTag,
}

export default runService