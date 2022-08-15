import {getByText, render, screen} from '@testing-library/react';
import TaskForm from "./TaskForm";
import {Router} from 'react-router-dom'
import {Provider} from "react-redux";
const { createMemoryHistory } = require("history");
import { store } from '../../app/store';
import TaskTable from "./TaskTable";

describe('Async component', () => {
    test('renders tasks if request succeeds', async () => {
        const history = createMemoryHistory();
        render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    act(() => {
                    <TaskTable />
                })
                </Router>
            </Provider>
        );

        const heading = await screen.getByText('Tasks', {exact: false});
        expect(heading).toBeInTheDocument();
    });
});