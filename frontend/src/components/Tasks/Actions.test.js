import {getByText, render, screen} from '@testing-library/react';
import TaskForm from "./TaskForm";
import {Router} from 'react-router-dom'
import {Provider} from "react-redux";
const { createMemoryHistory } = require("history");
import { store } from '../../app/store';
import Actions from "./Actions";

test('renders Actions component', async () => {
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router location={history.location} navigator={history}>
                <Actions />
            })
            </Router>
        </Provider>
    );

    const dropdownButton = screen.getByText('Options');
    expect(dropdownButton).toBeInTheDocument();
});
