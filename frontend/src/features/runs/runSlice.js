import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import runService from "./runService";

const initialState = {
    runs: [],
    run: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createRun = createAsyncThunk('runs/create', async (runData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await runService.createRun(runData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getRuns = createAsyncThunk('runs/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await runService.getRuns(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getRun = createAsyncThunk('runs/getOne', async (runId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await runService.getRun(runId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const runSlice = createSlice({
    name: 'runs',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        setRun: (state, action) => {
            state.run = action.payload
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(createRun.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createRun.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.runs.push(action.payload)
            })
            .addCase(createRun.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRuns.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRuns.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.runs = action.payload
            })
            .addCase(getRuns.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRun.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRun.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.run = action.payload
            })
            .addCase(getRun.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = runSlice.actions
export const {setRun} = runSlice.actions
export default runSlice.reducer