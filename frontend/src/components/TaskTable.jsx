import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getRuns, reset } from "../features/runs/runSlice";
import ClipLoader from 'react-spinners/ClipLoader'
import TaskItem from "./TaskItem";

import classes from './TaskTable.module.css'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const TaskTable = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [color, setColor] = useState("#044599");

    const { user } = useSelector(state => state.auth)
    const { runs, isLoading, isError, message } = useSelector(state => state.runs)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getRuns())

        return () => {
            dispatch(reset())
        }
    }, []);


    const tasksList = runs.map(task => (
        <TaskItem
            key={Math.random()}
            id={task._id}
            tag={task.tag}
            entrypoint={task.entrypoint}
            status={task.status}
            created={task.created}
            updated={task.updated}
            arguments={task.arguments}
        />
    ));

    const redirectHandler = () => {
        navigate('/add-run');
    }

    if (isLoading) {
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    return (
        <Fragment>
            <div className={classes.header}>
                <h1>Runs ({tasksList.length})</h1>
                <button className={classes.btnAddRun} onClick={redirectHandler}>+ Add run</button>
            </div>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Tag</th>
                        <th className={classes.th}>EntryPoint</th>
                        <th className={classes.th}>Status</th>
                        <th className={classes.th}>Created</th>
                        <th className={classes.th}>Updated</th>
                    </tr>
                </thead>
                {tasksList}
            </table>
        </Fragment>

    )
};

export default TaskTable;