import {configureStore} from '@reduxjs/toolkit';

// import slices
import runSlice from './run-slice';

const store = configureStore({
    reducer: {runs: runSlice.reducer}
});