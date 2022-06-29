import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showDetails: false,
}

const detailsSlice = createSlice({
    name: 'details',
    initialState: initialState,
    reducers: {
        showDetails(state) {
            state.showDetails = true
        },
        hideDetails(state) {
            state.showDetails = false
        }
    }
})

export const {showDetails, hideDetails} = detailsSlice.actions
export default detailsSlice.reducer