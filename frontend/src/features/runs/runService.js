import axios from "axios";

const API_URL = '/api/runs/'

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

const runService = {
    createRun,
    getRuns,
}

export default runService