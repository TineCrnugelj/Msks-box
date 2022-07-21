import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import fileService from './fileService'

const initialState = {
    file: null,
    files: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createFile = createAsyncThunk('files/create', async (fileData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fileService.createFile(fileData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const getFiles = createAsyncThunk('files/getFiles', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fileService.getFiles(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const deleteFile = createAsyncThunk('files/delete', async (fileId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fileService.deleteFile(fileId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(createFile.pending, state => {
                state.isLoading = true
            })
            .addCase(createFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.file = action.payload
            })
            .addCase(createFile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getFiles.pending, state => {
                state.isLoading = true
            })
            .addCase(getFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.files = action.payload
            })
            .addCase(getFiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteFile.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.files = state.files = state.files.filter((file) => file._id !== action.payload.id)
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = fileSlice.actions
export default fileSlice.reducer