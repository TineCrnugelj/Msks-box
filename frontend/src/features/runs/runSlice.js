import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import runService from "./runService";

const initialState = {
    runs: [],
    lockedRuns: [],
    isLocked: false,
    run: null,
    filteredRuns: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isErrorPlots: false,
    isSuccessPlots: false,
    isLoadingPlots: false,
    message: '',
    messagePlots: '',
    dataToPlot: []
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

export const lockRun = createAsyncThunk('runs/lock', async (runId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await runService.lockRun(runId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const deleteRun = createAsyncThunk('runs/delete', async (runId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await runService.deleteRun(runId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const updateRun = createAsyncThunk('runs/update', async (runData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await runService.updateRun(runData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getRunByTag = createAsyncThunk('runs/getRunByTag', async (tag, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await runService.getRunByTag(tag, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const isLocked = createAsyncThunk('runs/isLocked', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await runService.isLocked(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getDataToPlot = createAsyncThunk('runs/getData', async (taskId, thunkAPI) => {
    try {
        return await runService.getDataToPlot(taskId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const putEditTag = createAsyncThunk('runs/editTag', async (data, thunkAPI) => {
    try {
        const { taskId, tag } = data;
        return await runService.putEditTag(taskId, tag);
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
        resetPlots: (state) => {
            state.isLoadingPlots = false
            state.isErrorPlots = false
            state.isSuccessPlots = false
            state.messagePlots = ''
        },
        setFilteredRuns: (state, action) => {
            state.filteredRuns = action.payload
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
                state.filteredRuns = action.payload;
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
            .addCase(getRunByTag.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRunByTag.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.run = action.payload
            })
            .addCase(getRunByTag.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(lockRun.pending, (state) => {
                state.isLoading = true
            })
            .addCase(lockRun.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.lockedRuns.push(action.payload)
            })
            .addCase(lockRun.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteRun.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRun.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.filteredRuns = state.filteredRuns.filter((run) => run._id !== action.payload.id)
                state.runs = state.runs.filter((run) => run._id !== action.payload.id)
            })
            .addCase(deleteRun.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(isLocked.pending, (state) => {
                state.isLoading = true
            })
            .addCase(isLocked.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isLocked = true;
            })
            .addCase(isLocked.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDataToPlot.pending, (state) => {
                state.isLoadingPlots = true
            })
            .addCase(getDataToPlot.fulfilled, (state, action) => {
                state.isLoadingPlots = false
                state.isSuccessPlots = true
                state.dataToPlot = action.payload;
            })
            .addCase(getDataToPlot.rejected, (state, action) => {
                state.isLoadingPlots = false
                state.isErrorPlots = true
                state.messagePlots = action.payload
            })
            .addCase(putEditTag.pending, (state) => {
                state.isLoading = true
            })
            .addCase(putEditTag.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

                const index = state.filteredRuns.findIndex(task => task._id === action.payload._id);
                const newRuns = [...state.filteredRuns];
                newRuns[index] = action.payload;
                state.filteredRuns = newRuns;
            })
            .addCase(putEditTag.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset, resetPlots} = runSlice.actions
export const {setFilteredRuns} = runSlice.actions
export default runSlice.reducer