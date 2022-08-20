import { useState } from 'react';
import { useDispatch } from 'react-redux'
import useInput from '../../hooks/use-input';
import { createRun } from '../../features/runs/runSlice'
import { useNavigate } from 'react-router-dom';

import ArgumentPair from './ArgumentPair';
import classes from './TaskForm.module.css'

const TaskForm = () => {
    const dispatch = useDispatch();
    let [numOfArgs, setNumOfArgs] = useState(0);
    let [argId, setArgId] = useState(0);
    let [argIds, setArgIds] = useState([]);
    let [children, setChildren] = useState([]);
    const navigate = useNavigate()

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

        const args = [];
        const dependencies = [];

        for (let argId of argIds) {
            const key = event.target[`key${argId}`].value
            const value = event.target[`value${argId}`].value;

            if (value.includes('@')) {
                const dependency = value.substring(value.indexOf('@') + 1);
                dependencies.push(dependency);
            }

            if (key !== '' && value !== '') {
                args.push(key + '=' + value);
            }
            event.target[`key${argId}`].value = '';
            event.target[`value${argId}`].value = '';

            console.log(args);

            const run = {
                source: enteredSource,
                entrypoint: enteredEntrypoint,
                tag: enteredTag,
                arguments: args,
                dependencies: dependencies
            }
            dispatch(createRun(run));

            event.target.source.value = '';
            event.target.entrypoint.value = '';
            event.target.tag.value = '';

            navigate('/');
        }
    }

    const addArgumentHandler = (event) => {
        event.preventDefault();
        setNumOfArgs(++numOfArgs);
        setArgId(++argId);
        setArgIds(prevArgIds => {
            return [...prevArgIds, argId-1];
        })
        setChildren(prevState => {
            return [...prevState, <ArgumentPair index={numOfArgs-1} removeArgumentHandler={removeArgumentHandler} argId={argId-1} key={Math.random()} />]
        })
    };

    const removeArgumentHandler = (argId) => {
        if (numOfArgs > 0) {
            setNumOfArgs(--numOfArgs);
            setArgIds(prevArgIds => prevArgIds.filter(arg => arg !== argId));
            setChildren(children => children.filter(child => child.props.argId !== argId));
        }
    }

    const sourceClasses = sourceInputHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;
    const entrypointClasses = entrypointInputHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;

    return <form onSubmit={submitFormHandler}>
        <h1 className={classes.heading}>Add a task</h1>
        <div className={sourceClasses}>
            <label htmlFor="source">Source</label>
            <input type="text" id='source' value={enteredSource} onChange={sourceChangedHandler} onBlur={sourceBlurHandler} />
        </div>
        <div className={entrypointClasses}>
            <label htmlFor="entrypoint">Entrypoint</label>
            <input type="text" id='entrypoint' value={enteredEntrypoint} onChange={entrypointChangedHandler} onBlur={entrypointBlurHandler} />
        </div>
        <div className={classes.formControl}>
            <label htmlFor="tag">Tag</label>
            <input type="text" id='tag' value={enteredTag} onChange={tagChangedHandler} onBlur={tagBlurHandler} />
        </div>
        <div className={classes.argumentsGroup}>
            <h3 className={classes.args}>Arguments</h3>
            <div className={classes.addRemoveButtons}>
                <button onClick={addArgumentHandler} className={classes.btnAddArgument}>+ Add</button>
            </div>
        </div>

        {children}

        <button className={classes.btnSubmit} disabled={!formIsValid} >Submit</button>
    </form>
};

export default TaskForm;
