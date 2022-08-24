import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import ArgumentTable from '../components/tasks/ArgumentTable'
import FileList from "../components/files/FileList";
import Dependencies from "../components/tasks/Dependencies";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import Plots from "../components/tasks/Plots";
import Logs from "../components/tasks/Logs";
import Card from '../UI/Card';
import {Fragment, useEffect, useState} from "react";

import en from 'javascript-time-ago/locale/en.json'
import classes from './Dashboard.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import {getTask, reset} from "../features/tasks/taskSlice";

TimeAgo.addLocale(en);

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const TaskDetails = () => {
    const dispatch = useDispatch();
    const { taskId } = useParams();
    let [color] = useState("#044599");
    const [value, setValue] = useState(0);

    const task  = useSelector(state => state.tasks.task);
    const { isLoading, isError, message } = useSelector(state => state.tasks);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        dispatch(getTask(taskId));

        return () => {
            dispatch(reset());
        }
    }, []);

    if (isLoading) {
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    if (!task) {
        return null;
    }
    else {
        return <Fragment>
            <section className={classes.tasks}>
                <Card>
                    <div className={classes.head}>
                        <h1 className={classes.heading}>Task Details: {task.tag ? task.tag : '/'}</h1>
                    </div>
                    <p><strong>Hash: </strong>{task.hash}</p>
                    <p><strong>Status: </strong>{task.status} &nbsp;  <strong>Entrypoint: </strong>{task.entrypoint} &nbsp; <strong>Commit: </strong>{task.commit}</p>
                    <p><strong>Created: </strong><ReactTimeAgo locale='en' date={new Date(task.created)} /></p>
                    <p><strong>Updated: </strong><ReactTimeAgo locale='en' date={new Date(task.updated)} /></p>
                    <h3>Arguments:</h3>
                    {task.arguments.length > 0 ? <ArgumentTable args={task.arguments}/> : <p>No arguments</p>}
                    <Dependencies dependencies={task.dependencies} id={task._id} />
                </Card>
            </section>
            <section className={classes.tasks}>
                <Card>
                    <Logs id={task._id} />
                </Card>
            </section>
            <section className={classes.tasks}>
                <Card>
                    <FileList id={task._id} />
                </Card>
            </section>
            <section className={classes.tasks}>
                <Card>
                    <Plots id={task._id} />
                </Card>
            </section>
        </Fragment>

    }
}

export default TaskDetails;
