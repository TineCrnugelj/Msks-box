import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom'
import {Provider} from "react-redux";
const { createMemoryHistory } = require("history");
import { store } from '../../app/store';
import Dependencies from "./Dependencies";

describe('Renders Dependencies', () => {
    test('Renders No dependencies if empty array',  () => {
        const history = createMemoryHistory();
        const {container} = render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <Dependencies dependencies={[]} />
                </Router>
            </Provider>
        );

        const noDepsText = container.querySelector('.noDeps');
        expect(noDepsText).toBeInTheDocument();
    });

    test('Renders dependencies if not empty array',  () => {
        const history = createMemoryHistory();
        render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <Dependencies dependencies={[1234, 5342]} />
                </Router>
            </Provider>
        );

        const dep1 = screen.getByText('1234');
        const dep2 = screen.getByText('5342');

        expect(dep1).toBeInTheDocument();
        expect(dep2).toBeInTheDocument();
    });
});

