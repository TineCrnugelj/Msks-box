import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
    tasks: [],
    lockedTasks: [],
    isLocked: false,
    task: null,
    filteredTasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isErrorPlots: false,
    isSuccessPlots: false,
    isLoadingPlots: false,
    isErrorLogs: false,
    isSuccessLogs: false,
    isLoadingLogs: false,
    message: '',
    messagePlots: '',
    messageLogs: '',
    dataToPlot: [],
    logs: [],
    tasksToCompare: [],
    dataToPlotCompare: [],
}

export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.createTask(taskData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getTasks = createAsyncThunk('tasks/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.getTasks(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getTask = createAsyncThunk('tasks/getOne', async (taskId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.getTask(taskId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const lockTask = createAsyncThunk('tasks/lock', async (taskId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.lockTask(taskId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (taskId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.deleteTask(taskId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const updateTask = createAsyncThunk('tasks/update', async (taskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.updateTask(taskData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getTaskByTag = createAsyncThunk('tasks/getTaskByTag', async (tag, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.getTaskByTag(tag, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const isLocked = createAsyncThunk('tasks/isLocked', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.isLocked(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getDataToPlot = createAsyncThunk('tasks/getData', async (taskId, thunkAPI) => {
    try {
        return await taskService.getDataToPlot(taskId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getDataToPlotCompare = createAsyncThunk('tasks/getDataCompare', async (taskId, thunkAPI) => {
    try {
        return await taskService.getDataToPlot(taskId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getLogs = createAsyncThunk('tasks/getLogs', async (taskId, thunkAPI) => {
    try {
        return await taskService.getLogs(taskId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const putEditTag = createAsyncThunk('tasks/editTag', async (data, thunkAPI) => {
    try {
        const { taskId, tag } = data;
        return await taskService.putEditTag(taskId, tag);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const taskSlice = createSlice({
    name: 'tasks',
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
        resetLogs: (state) => {
            state.isLoadingLogs = false
            state.isErrorLogs = false
            state.isSuccessLogs = false
            state.messageLogs = ''
        },
        setFilteredTasks: (state, action) => {
            state.filteredTasks = action.payload
        },
        addToCompare: (state, action) => {
            state.tasksToCompare.push(action.payload)
        },
        removeFromCompare: (state, action) => {
            state.tasksToCompare = state.tasksToCompare.filter(task => task.id !== action.payload);
            state.dataToPlotCompare = state.dataToPlotCompare.filter(plot => {
                if (plot[0]) {
                    return plot[0].task !== action.payload;
                }
            });
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload
                state.filteredTasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.task = action.payload
            })
            .addCase(getTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTaskByTag.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTaskByTag.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.task = action.payload
            })
            .addCase(getTaskByTag.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(lockTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(lockTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.lockedTasks.push(action.payload)
            })
            .addCase(lockTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.filteredTasks = state.filteredTasks.filter((task) => task._id !== action.payload.id)
                state.tasks = state.tasks.filter((task) => task._id !== action.payload.id)
            })
            .addCase(deleteTask.rejected, (state, action) => {
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
            .addCase(getDataToPlotCompare.pending, (state) => {
                state.isLoadingPlots = true
            })
            .addCase(getDataToPlotCompare.fulfilled, (state, action) => {
                state.isLoadingPlots = false
                state.isSuccessPlots = true
                state.dataToPlotCompare.push(action.payload)
            })
            .addCase(getDataToPlotCompare.rejected, (state, action) => {
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

                const index = state.filteredTasks.findIndex(task => task._id === action.payload._id);
                const newTasks = [...state.filteredTasks];
                newTasks[index] = action.payload;
                state.filteredTasks = newTasks;
            })
            .addCase(getLogs.pending, (state) => {
                state.isLoadingLogs = true
            })
            .addCase(getLogs.fulfilled, (state, action) => {
                state.isLoadingLogs = false
                state.isSuccessLogs = true
                state.logs = action.payload;
            })
            .addCase(getLogs.rejected, (state, action) => {
                state.isLoadingLogs = false
                state.isErrorLogs = true
                state.messageLogs = action.payload
            })
    }
})

export const {reset, resetPlots, resetLogs, addToCompare, removeFromCompare} = taskSlice.actions
export const {setFilteredTasks} = taskSlice.actions
export default taskSlice.reducer