import {render, screen} from '@testing-library/react';
import TaskForm from "./TaskForm";
import {Router} from 'react-router-dom'
import {Provider} from "react-redux";
const { createMemoryHistory } = require("history");
import { store } from '../../app/store';


test('renders new task form title', () => {
   // Arrage
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router location={history.location} navigator={history}>
                <TaskForm />
            </Router>
        </Provider>
    );


   // Act
   // ... nothing

   // Assert
   const title = screen.getByText(/Add a task/i);
   const submitBtn = screen.getByText(/Submit/i);
   const sourceLabel = screen.getByText(/Source/i);
   const entrypointLabel = screen.getByText(/Entrypoint/i);
   const tagLabel = screen.getByText(/Tag/i);
   const sourceInput = screen.getByLabelText(/Source/i);
   const entrypointInput = screen.getByLabelText(/Entrypoint/i);
   const tagInput = screen.getByLabelText(/Tag/i);

   expect(title).toBeInTheDocument();
   expect(sourceLabel).toBeInTheDocument();
   expect(entrypointLabel).toBeInTheDocument();
   expect(tagLabel).toBeInTheDocument();
   expect(sourceInput).toBeInTheDocument();
   expect(entrypointInput).toBeInTheDocument();
   expect(tagInput).toBeInTheDocument();
   expect(submitBtn).toBeInTheDocument();
});

