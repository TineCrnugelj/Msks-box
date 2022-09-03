import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import ArgumentTable from '../components/tasks/ArgumentTable'
import Dependencies from "../components/tasks/Dependencies";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import Section from "../components/tasks/Section";
import Card from '../UI/Card';
import {Fragment, useEffect, useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import en from 'javascript-time-ago/locale/en.json'
import classes from './Dashboard.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import {addToCompare, getTask, reset} from "../features/tasks/taskSlice";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";

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

    const addToCompareHandler = () => {
        toast.success('Task added to compare.', {autoClose: 1500});
        const task1 = {
            id: task.id,
            source: task.source,
            entrypoint: task.entrypoint,
            tag: task.tag,
            args: task.arguments,
            created: task.created,
            updated: task.updated,
            status: task.status,
            commit: task.commit,
        }
        dispatch(addToCompare(task1));
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!task) {
        return null;
    }

    return (
        <Fragment>
            <section className={classes.tasks}>
                <Card>
                    <div className={classes.head}>
                        <h1 className={classes.heading}>Task Details: {task.hash}</h1>
                        <Button onClick={addToCompareHandler} className={classes.addToCompareBtn}>+ Add to compare</Button>
                    </div>
                    <p><strong>Tags: </strong>{task.tag ? task.tag : 'No tags'}</p>
                    <p><strong>Status: </strong>{task.status} &nbsp;  <strong>Entrypoint: </strong>{task.entrypoint} &nbsp; <strong>Commit: </strong>{task.commit}</p>
                    <p><strong>Created: </strong><ReactTimeAgo locale='en' date={new Date(task.created)} /></p>
                    <p><strong>Updated: </strong><ReactTimeAgo locale='en' date={new Date(task.updated)} /></p>
                    <h3 className={classes.argsTitle}>Arguments:</h3>
                    {task.arguments.length > 0 ? <ArgumentTable args={task.arguments}/> : <p>No arguments</p>}
                    <Dependencies dependencies={task.dependencies} id={task._id} />
                    <Box sx={{ width: '100%' }} marginTop={3} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered variant='fullWidth'>
                                <Tab label="Output"  />
                                <Tab label="Files" />
                                <Tab label="Plots" />
                            </Tabs>
                        </Box>
                        <Section value={value} index={0} task={task} />
                        <Section value={value} index={1} task={task} />
                        <Section value={value} index={2} task={task} />
                    </Box>
                </Card>
            </section>
        </Fragment>
    );
}

export default TaskDetails;
