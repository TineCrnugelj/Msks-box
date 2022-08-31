import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { createTask } from '../../features/tasks/taskSlice'
import { useNavigate, useSearchParams } from 'react-router-dom';

import ArgumentPair from './ArgumentPair';
import classes from './TaskForm.module.css'
import {toast} from "react-toastify";

const CloneTaskForm = () => {
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams()

    const [source, setSource] = useState(searchParams.get('source'))
    const [entrypoint, setEntrypoint] = useState(searchParams.get('entrypoint'))
    const [tag, setTag] = useState('');
    const [action] = useState(searchParams.get('action'));
    let [argId, setArgId] = useState(searchParams.get('arguments').split(',').length);
    let [numOfArgs, setNumOfArgs] = useState(searchParams.get('arguments').split(',').length);
    let [argIds, setArgIds] = useState([...Array(numOfArgs).keys()]);

    let [children, setChildren] = useState([]);

    useEffect(() => {
        action === 'update' ? setTag(searchParams.get('tag')) : setTag('');
        const args = searchParams.get('arguments').split(',');

        const argElements = []
        for (let i = 1; i <= numOfArgs; i++) { // export to function
            const keyValue = args[i - 1].split('=')
            const key = keyValue[0].replace(/\W@:./g, '')
            const value = keyValue[1].replace(/\W@:./g, '')
            argElements.push(<ArgumentPair removeArgumentHandler={removeArgumentHandler} key1={key} value={value} argId={i-1} key={Math.random()} />)
        }

        setChildren(argElements);
    }, [])
    let formIsValid = false;

    const navigate = useNavigate()

    const sourceChangedHandler = (e) => {
        setSource(e.target.value)
    }
    const entrypointChangedHandler = (e) => {
        setEntrypoint(e.target.value)
    }
    const tagChangedHandler = (e) => {
        setTag(e.target.value)
    }

    formIsValid = source !== '' && entrypoint !== '' && numOfArgs > 0;

    const submitFormHandler = (event) => {
        event.preventDefault();

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
        }

        const task = {
            source: source,
            entrypoint: entrypoint,
            tag: tag,
            arguments: args,
            dependencies: dependencies
        }

        if (action === 'clone') { // FIX THIS
            dispatch(createTask(task));
        }

        event.target.source.value = '';
        event.target.entrypoint.value = '';
        event.target.tag.value = '';

        navigate('/');
        toast.success('Task successfully created!', {autoClose: 1500});
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

    return <form onSubmit={submitFormHandler}>
        <h1 className={classes.heading}>{action === 'update' ? 'Edit' : 'Add'} a task</h1>
        <div className={classes.formControl}>
            <label htmlFor="source">Source</label>
            <input type="text" id='source' value={source} onChange={sourceChangedHandler} />
        </div>
        <div className={classes.formControl}>
            <label htmlFor="entrypoint">Entrypoint</label>
            <input type="text" id='entrypoint' value={entrypoint} onChange={entrypointChangedHandler} />
        </div> 
        <div className={classes.formControl}>
            <label htmlFor="tag">Tag</label>
            <input type="text" id='tag' value={tag} onChange={tagChangedHandler} />
        </div>
        <div className={classes.argumentsGroup}>
            <h3 className={classes.args}>Arguments</h3>
            <button onClick={addArgumentHandler} className={classes.btnAddArgument}>+ Add</button>
        </div>

        {children}
        <div className={classes.addRemoveButtons}>
            <button className={classes.btnSubmit} disabled={!formIsValid}>Create</button>
        </div>
    </form>
};

export default CloneTaskForm;