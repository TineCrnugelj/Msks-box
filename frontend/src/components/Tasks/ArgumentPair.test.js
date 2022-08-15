import {getByText, render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom'
import {Provider} from "react-redux";
const { createMemoryHistory } = require("history");
import { store } from '../../app/store';
import ArgumentPair from "./ArgumentPair";

test('renders Argument pair component', async () => {
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router location={history.location} navigator={history}>
                <ArgumentPair />
            </Router>
        </Provider>
    );

    const label1 = screen.getByText('Key');
    const label2 = screen.getByText('Value');

    expect(label1).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
});
