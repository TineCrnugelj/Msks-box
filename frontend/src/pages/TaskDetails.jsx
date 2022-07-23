import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import ArgumentTable from '../components/ArgumentTable'
import Dependencies from "../components/Dependencies";
import helpers from  '../helpers/helpers';
import Card from '../UI/Card';
import {useEffect, useState} from "react";

import classes from './Dashboard.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import {getRun, reset, setRun} from "../features/runs/runSlice";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const TaskDetails = (props) => {
    const dispatch = useDispatch();
    const { taskId } = useParams();
    let [color] = useState("#044599");

    const run  = useSelector(state => state.runs.run);
    const { isLoading, isError, message } = useSelector(state => state.runs);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        dispatch(getRun(taskId));

        return () => {
            dispatch(reset());
        }
    }, []);


    if (isLoading) {
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    if (!run) {
        return null;
    }
    else {
        return <section className={classes.tasks}>
            <Card>
                <div className={classes.head}>
                    <h1 className={classes.heading}>Task Details: {run.tag ? run.tag : '/'}</h1>
                </div>
                <p><strong>Status: </strong>{run.status}</p>
                <p><strong>Created: </strong>{helpers.parseDate(run.created)}</p>
                <p><strong>Updated: </strong>{helpers.parseDate(run.updated)}</p>
                <h3>Arguments:</h3>
                {run.arguments.length > 0 ? <ArgumentTable args={run.arguments}/> : <p>No arguments</p>}
                <Dependencies dependencies={run.dependencies} id={run._id} />
            </Card>
        </section>
    }
}

export default TaskDetails;