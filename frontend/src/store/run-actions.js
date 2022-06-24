import { runActions } from "./run-slice";

export const fetchRunData = () => {
    return async dispatch => {
        const fetchRunData = async () => {
            const response = await fetch('http://localhost:5000/api/runs');
            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();
            return data;
        };
        try {
            const runData = await fetchRunData();
            dispatch(runActions.setRuns(runData));
        } catch (error) {
            console.log(error);
        }
    }
};