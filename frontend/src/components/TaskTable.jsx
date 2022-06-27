import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getRuns, reset } from "../features/runs/runSlice";
import Spinner from '../components/Spinner'

import TaskItem from "./TaskItem";

import classes from './TaskTable.module.css'


const DUMMY_TASKS = [
    {
        _id: "62b1bb0d04b571eb2789fb4d",
        repository: "file:///home/lukacu/checkouts/gaptrack/",
        commit: "master",
        entrypoint: "train_match",
        arguments: [
            "embedding=@state_16_large:state.pt",
            "backbone=resnet18@layer3",
            "stop_epochs=200",
            "lr_step=30",
            "lr_gamma=0.5",
            "embedding_loss=false",
            "batch_size=64",
            "feature_reduction=256",
            "augment_move=60",
            "delta=3",
            "batch_size=64",
            "augment_scale=0.2",
            "mismatches=0.05",
            "position_weight=30"
        ],
        status: "PENDING",
        created: "2022-06-21T12:35:25.719Z",
        updated: "2022-06-21T12:38:07.849Z",
    },
    {
        _id: "62b1bb0d04b571eb2789fb4d",
        repository: "file:///home/lukacu/checkouts/gaptrack/",
        commit: "master",
        entrypoint: "train_match",
        arguments: [
            "embedding=@state_16_large:state.pt",
            "backbone=resnet18@layer3",
            "stop_epochs=200",
            "lr_step=30",
            "lr_gamma=0.5",
            "embedding_loss=false",
            "batch_size=64",
            "feature_reduction=256",
            "augment_move=60",
            "delta=3",
            "batch_size=64",
            "augment_scale=0.2",
            "mismatches=0.05",
            "position_weight=30"
        ],
        status: "PENDING",
        created: "2022-06-21T12:35:25.719Z",
        updated: "2022-06-21T12:38:07.849Z",
    },
    {
        _id: "62b1bb0d04b571eb2789fb4d",
        repository: "file:///home/lukacu/checkouts/gaptrack/",
        commit: "master",
        entrypoint: "train_match",
        arguments: [
            "embedding=@state_16_large:state.pt",
            "backbone=resnet18@layer3",
            "stop_epochs=200",
            "lr_step=30",
            "lr_gamma=0.5",
            "embedding_loss=false",
            "batch_size=64",
            "feature_reduction=256",
            "augment_move=60",
            "delta=3",
            "batch_size=64",
            "augment_scale=0.2",
            "mismatches=0.05",
            "position_weight=30"
        ],
        status: "PENDING",
        created: "2022-06-21T12:35:25.719Z",
        updated: "2022-06-21T12:38:07.849Z",
    },
    {
        _id: "62b1bb0d04b571eb2789fb4d",
        repository: "file:///home/lukacu/checkouts/gaptrack/",
        commit: "master",
        entrypoint: "train_match",
        arguments: [
            "embedding=@state_16_large:state.pt",
            "backbone=resnet18@layer3",
            "stop_epochs=200",
            "lr_step=30",
            "lr_gamma=0.5",
            "embedding_loss=false",
            "batch_size=64",
            "feature_reduction=256",
            "augment_move=60",
            "delta=3",
            "batch_size=64",
            "augment_scale=0.2",
            "mismatches=0.05",
            "position_weight=30"
        ],
        status: "PENDING",
        created: "2022-06-21T12:35:25.719Z",
        updated: "2022-06-21T12:38:07.849Z",
    }
];


const TaskTable = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            entrypoint={task.entrypoint}
            status={task.status}
            created={task.created}
            updated={task.updated}
        />
    ));

    const redirectHandler = () => {
        navigate('/add-run');
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <div className={classes.header}>
                <h1>Runs ({tasksList.length})</h1>
                <button className={classes.btnAddRun} onClick={redirectHandler}>+ Add run</button>
            </div>
            <table className={classes.table}>
                <tr>
                    <th>EntryPoint</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                </tr>
                {tasksList}
            </table>
        </Fragment>

    )
};

export default TaskTable;