import { createSlice } from "@reduxjs/toolkit";

const runSlice = createSlice({
    name: 'runs',
    initialState: {
        runs: [],
    },
    reducers: {
        setRuns(state, action) {
            state.runs = action.payload.runs;
        },
        addRun(state, action) {
            const newRun = action.payload;
            state.runs.push({
                source: newRun.source,
                entrypoint: newRun.entrypoint,
                tag: newRun.tag,
                arguments: newRun.arguments,
            });
        }
    }
});

export const runActions = runSlice.actions;
export default runSlice;