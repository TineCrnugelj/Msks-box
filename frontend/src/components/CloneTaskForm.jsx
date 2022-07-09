import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { createRun } from '../features/runs/runSlice'
import { useNavigate, useSearchParams } from 'react-router-dom';

import ArgumentPair from './ArgumentPair';
import classes from './TaskForm.module.css'

const CloneTaskForm = (props) => {
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams()

    const [source, setSource] = useState(searchParams.get('source'))
    const [entrypoint, setEntrypoint] = useState(searchParams.get('entrypoint'))
    const [tag, setTag] = useState(searchParams.get('tag'))

    let [numOfArgs, setNumOfArgs] = useState(searchParams.get('arguments').split(',').length);
    let [children, setChildren] = useState([<ArgumentPair index={1} key={Math.random()} />]);


    useEffect(() => {
        const args = searchParams.get('arguments').split(',')
        const argElements = []
        for (let i = 1; i <= numOfArgs; i++) {
            const keyValue = args[i - 1].split('=')
            const key = keyValue[0].replace(/\W/g, '')
            const value = keyValue[1].replace(/\W/g, '')
            argElements.push(<ArgumentPair key1={key} value={value} index={i} key={Math.random()} />)
        }
        setChildren(argElements)
    }, [])

    let formIsValid = false

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

    formIsValid = source !== '' && entrypoint !== '' && numOfArgs > 0

    const submitFormHandler = (event) => {
        event.preventDefault();

        const args = [];
        for (let i = 1; i <= numOfArgs; i++) {
            const key = event.target[`key${i}`].value
            const value = event.target[`value${i}`].value;

            if (key !== '' && value !== '') {
                args.push(key + '=' + value);
            }
            event.target[`key${i}`].value = '';
            event.target[`value${i}`].value = '';

        }

        const run = {
            source: source,
            entrypoint: entrypoint,
            tag: tag,
            arguments: args // todo
        }
        console.log(run)
        dispatch(createRun(run));

        event.target.source.value = '';
        event.target.entrypoint.value = '';
        event.target.tag.value = '';

        navigate('/')
    }

    const addArgumentHandler = (event) => {
        event.preventDefault();
        setNumOfArgs(++numOfArgs);
        setChildren(prevState => {
            return [...prevState, <ArgumentPair index={numOfArgs} key={Math.random()} />]
        })
    };

    const removeArgumentHandler = (event) => {
        event.preventDefault();
        if (numOfArgs > 0) {
            setNumOfArgs(--numOfArgs);
            let newChildren = [...children];
            newChildren.pop();
            setChildren(newChildren);
        }
    }


    return <form onSubmit={submitFormHandler}>
        <h1 className={classes.heading}>Add a run</h1>
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
            <h3 className={classes.arguments}>Arguments</h3>
            <button onClick={addArgumentHandler} className={classes.btnAddArgument}>+ Add</button>
            <button onClick={removeArgumentHandler} className={classes.btnAddArgument}>- Remove</button>
        </div>

        {children}

        <button className={classes.btnSubmit} disabled={!formIsValid}>Submit</button>
    </form>
};

export default CloneTaskForm;