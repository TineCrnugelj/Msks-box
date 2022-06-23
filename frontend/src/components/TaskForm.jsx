import { useState } from 'react';
import useInput from '../hooks/use-input';

import ArgumentPair from './ArgumentPair';
import classes from './TaskForm.module.css'

const TaskForm = (props) => {
    let [numOfArgs, setNumOfArgs] = useState(1);
    let [children, setChildren] = useState([<ArgumentPair key={Math.random()} />]);

    const {
        value: enteredSource,
        isValid: enteredSourceIsValid,
        hasError: sourceInputHasError,
        valueChangeHandler: sourceChangedHandler,
        inputBlurHandler: sourceBlurHandler,
        reset: resetSourceInput
    } = useInput(value => value.trim().length > 5);

    const {
        value: enteredEntrypoint,
        isValid: enteredEntrypointIsValid,
        hasError: entrypointInputHasError,
        valueChangeHandler: entrypointChangedHandler,
        inputBlurHandler: entrypointBlurHandler,
        reset: resetEntrypointInput
    } = useInput(value => value.trim().length > 2);

    const {
        value: enteredTag,
        isValid: enteredTagIsValid,
        hasError: tagInputHasError,
        valueChangeHandler: tagChangedHandler,
        inputBlurHandler: tagBlurHandler,
        reset: resetTagInput
    } = useInput(value => value.trim().length >= 0);

    let formIsValid = false;

    formIsValid = enteredSourceIsValid && enteredEntrypointIsValid;

    const submitFormHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }

        // POST run
        const run = {
            source: enteredSource,
            entrypoint: enteredEntrypoint,
            tag: enteredTag
        }

        console.log(run);

        resetSourceInput();
        resetEntrypointInput();
    }

    const addArgumentHandler = (event) => {
        event.preventDefault();
        setNumOfArgs(++numOfArgs);
        // setChildren([...children, <ArgumentPair key={numOfArgs} />])
        setChildren(prevState => {
            return [...prevState, <ArgumentPair key={Math.random()} />]
        })
    };

    const removeArgumentHandler = (event) => {
        event.preventDefault();
        if (numOfArgs > 0) {
            setNumOfArgs(--numOfArgs);
            let newChildren = [...children];
            newChildren.splice(numOfArgs - 1, 1);
            setChildren(newChildren);
            //setChildren(children.splice(-1, 1));
        }
    }

    const sourceClasses = sourceInputHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;
    const entrypointClasses = entrypointInputHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;

    return <form onSubmit={submitFormHandler}>
        <h1 className={classes.heading}>Add a run</h1>
        <div className={sourceClasses}>
            <label htmlFor="source">Source</label>
            <input type="text" id='source' onChange={sourceChangedHandler} onBlur={sourceBlurHandler} />
        </div>
        <div className={entrypointClasses}>
            <label htmlFor="entrypoint">Entrypoint</label>
            <input type="text" id='entrypoint' onChange={entrypointChangedHandler} onBlur={entrypointBlurHandler} />
        </div>
        <div className={classes.formControl}>
            <label htmlFor="tag">Tag</label>
            <input type="text" id='tag' onChange={tagChangedHandler} onBlur={tagBlurHandler} />
        </div>
        <div className={classes.argumentsGroup}>
            <h3 className={classes.arguments}>Arguments</h3>
            <button onClick={addArgumentHandler} className={classes.btnAddArgument}>+ Add</button>
            <button onClick={removeArgumentHandler} className={classes.btnAddArgument}>- Remove</button>
        </div>

        {children}

        <button className={classes.btnSubmit} disabled={!formIsValid} >Submit</button>
    </form>
};

export default TaskForm;