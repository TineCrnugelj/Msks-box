import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getRuns, reset, setFilteredRuns } from "../features/runs/runSlice";
import ClipLoader from 'react-spinners/ClipLoader'
import TaskItem from "./TaskItem";
import Searchbar from "./Searchbar";

import classes from './TaskTable.module.css'
import {MDBCol} from "mdbreact";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const TaskTable = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [color] = useState("#044599");
    const [searchQuery, setSearchQuery] = useState('');

    let { runs, isLoading, isError, message } = useSelector(state => state.runs);
    let filteredRuns = useSelector(state => state.runs.filteredRuns);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getRuns());

        return () => {
            dispatch(reset())
        }
    }, []);

    if (isLoading) {
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    const tasksList = filteredRuns.map(task => (
        <TaskItem
            key={task._id}
            source={task.repository}
            id={task._id}
            tag={task.tag}
            entrypoint={task.entrypoint}
            status={task.status}
            created={task.created}
            updated={task.updated}
            arguments={task.arguments}
            dependencies={task.dependencies}
            hash={task.hash}
        />
    ));

    const redirectHandler = () => {
        navigate('/tasks/add-task');
    }

    const searchTasks = (e) => {
        setSearchQuery(e.target.value);
        const searchWord = e.target.value.toLowerCase();
        const newFilter = runs.filter((run) => {
            return run.tag.toLowerCase().includes(searchWord) ||
                   run.status.toLowerCase().includes(searchWord) ||
                   run.entrypoint.toLowerCase().includes(searchWord);
        });

        dispatch(setFilteredRuns(newFilter));
    }

    return (
        <Fragment>
            <div className={classes.header}>
                <h1>Tasks ({tasksList.length})</h1>
                <button className={classes.btnAddRun} onClick={redirectHandler}>+ Add task</button>
                <MDBCol className={classes.searchBar} md="2">
                    <div className="input-group md-form form-sm form-1 pl-0">
                        <input
                            onChange={searchTasks}
                            className="form-control my-0 py-1"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchQuery}
                        />
                    </div>
                </MDBCol>
            </div>

            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Tag</th>
                        <th className={classes.th}>EntryPoint</th>
                        <th className={classes.th}>Status</th>
                        <th className={classes.th}>Created</th>
                        <th className={classes.th}>Updated</th>
                        <th className={classes.th}>Actions</th>
                    </tr>
                </thead>
                {tasksList}
            </table>
            {tasksList.length === 0 ?  <h4 className={classes.noTasks}>No tasks found</h4> : ''}
        </Fragment>

    )
};

export default TaskTable