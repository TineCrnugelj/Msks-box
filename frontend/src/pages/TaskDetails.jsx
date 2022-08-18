import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import ArgumentTable from '../components/tasks/ArgumentTable'
import FileList from "../components/files/FileList";
import Dependencies from "../components/tasks/Dependencies";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import Plots from "../components/tasks/Plots";
import Card from '../UI/Card';
import {Fragment, useEffect, useState} from "react";

import en from 'javascript-time-ago/locale/en.json'
import classes from './Dashboard.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import {getRun, reset} from "../features/runs/runSlice";

TimeAgo.addLocale(en);

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const TaskDetails = () => {
    const dispatch = useDispatch();
    const { hash } = useParams();
    let [color] = useState("#044599");

    const run  = useSelector(state => state.runs.run);
    const { isLoading, isError, message } = useSelector(state => state.runs);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        dispatch(getRun(hash));

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
        return <Fragment>
            <section className={classes.tasks}>
                <Card>
                    <div className={classes.head}>
                        <h1 className={classes.heading}>Task Details: {run.tag ? run.tag : '/'}</h1>
                    </div>
                    <p><strong>Status: </strong>{run.status}</p>
                    <p><strong>Entrypoint: </strong>{run.entrypoint}</p>
                    <p><strong>Hash: </strong>{run.hash}</p>
                    <p><strong>Commit: </strong>{run.commit}</p>
                    <p><strong>Created: </strong><ReactTimeAgo locale='en' date={new Date(run.created)} /></p>
                    <p><strong>Updated: </strong><ReactTimeAgo locale='en' date={new Date(run.updated)} /></p>
                    <h3>Arguments:</h3>
                    {run.arguments.length > 0 ? <ArgumentTable args={run.arguments}/> : <p>No arguments</p>}
                    <Dependencies dependencies={run.dependencies} id={run._id} />
                </Card>
            </section>
            <section className={classes.tasks}>
                <Card>
                    <FileList id={run._id} />
                </Card>
            </section>
            <section className={classes.tasks}>
                <Card>
                    <Plots id={run._id} />
                </Card>
            </section>
        </Fragment>

    }
}

export default TaskDetails;