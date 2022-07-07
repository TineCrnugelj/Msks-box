import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FaTimes} from 'react-icons/fa'
import { hideDetails } from "../features/details/detailsSlice";
import ArgumentTable from './ArgumentTable'
import Graph from './Graph'

import classes from './TaskDetails.module.css'


const TaskDetails = (props) => {
    const dispatch = useDispatch()
    const run = useSelector(state => state.runs.run);
    
    const closeDetailsHandler = () => {
        dispatch(hideDetails())
    }

    return <Fragment>
        <div className={classes.head}>
            <h1 className={classes.heading}>Task Details</h1>
            <button className={classes.btnClose} onClick={closeDetailsHandler}><FaTimes size={20} /></button>
        </div>
        <p><strong>Tag: </strong>{run.tag ? run.tag : '/'}</p>
        <p><strong>Status: </strong>{run.status}</p>
        <p><strong>Created: </strong>{run.created}</p>
        <p><strong>Updated: </strong>{run.updated}</p> 
        <h3>Arguments:</h3>
        {run.arguments.length > 0 ? <ArgumentTable args={run.arguments}/> : <p>No arguments</p>} 
        <Graph />
    </Fragment> 
}

export default TaskDetails;