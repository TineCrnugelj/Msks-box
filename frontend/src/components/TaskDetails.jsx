import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import ArgumentTable from './ArgumentTable'
import Dependencies from "./Dependencies";
import Graph from './Graph';
import Card from '../UI/Card';
import {useEffect} from "react";

import classes from '../pages/Dashboard.module.css'
import {getRun, reset} from "../features/runs/runSlice";

const API_URL = '/api/tasks/';

const TaskDetails = (props) => {
    const dispatch = useDispatch();
    const { taskId } = useParams();

    useEffect( () => {
        async function fetchTask() {
            const response = await axios.get(API_URL + taskId)
            console.log(response.data);
        }
        fetchTask()
    }, []);



    /*
    return <section className={classes.tasks}>
        <Card>
            <div className={classes.head}>
                <h1 className={classes.heading}>Task Details: {run.tag ? run.tag : '/'}</h1>
            </div>
            <p><strong>Status: </strong>{run.status}</p>
            <p><strong>Created: </strong>{run.created}</p>
            <p><strong>Updated: </strong>{run.updated}</p>
            <h3>Arguments:</h3>
            {run.arguments.length > 0 ? <ArgumentTable args={run.arguments}/> : <p>No arguments</p>}
            <Dependencies dependencies={run.dependencies} />
            <Graph />
        </Card>
    </section>
     */
    return <h1>asd</h1>
}

export default TaskDetails;