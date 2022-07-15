import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import classes from './TaskItem.module.css'
import { useDispatch } from 'react-redux'
import { showDetails } from '../features/details/detailsSlice'
import { deleteRun, lockRun, unlockRun, updateRun } from '../features/runs/runSlice'
import { toast } from 'react-toastify'
import { setRun } from '../features/runs/runSlice'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskItem = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [locked, setLocked] = useState(false)

    const toggleDetailsHandler = () => {
        dispatch(showDetails())

        const run = {
            tag: props.tag,
            entrypoint: props.entrypoint,
            status: props.status,
            created: props.created,
            updated: props.updated,
            arguments: props.arguments,
            dependencies: props.dependencies
        }
        dispatch(setRun(run));
    }

    const toggleLockHandler = (e) => {
        e.preventDefault()
        dispatch(lockRun(props.id))
        setLocked(true)
        toast.success('Task locked.', { autoClose: 2000 })
    }

    const toggleUnlockHandler = () => {
        dispatch(unlockRun(props.id))
        setLocked(false)
    }

    const cloneTaskHandler = () => {
        navigate(`/update-run?action=clone&source=${props.source}&entrypoint=${props.entrypoint}&tag=${props.tag}&arguments=${props.arguments}`)
    }

    const deleteTaskHandler = () => {
        dispatch(deleteRun(props.id))
    }

    const updateTaskHandler = () => {
        navigate(`/update-run?action=update&id=${props.id}&source=${props.source}&entrypoint=${props.entrypoint}&tag=${props.tag}&arguments=${props.arguments}`)
    }

    return <tbody>
        <tr className={classes.task}>
            <td>{props.tag}</td>
            <td>{props.entrypoint}</td>
            <td>{props.status}</td>
            <td>{props.created}</td>
            <td>{props.updated}</td>
            <td>
                <DropdownButton id="dropdown-basic-button" title="Options">
                    <Dropdown.Item onClick={toggleDetailsHandler} >Details</Dropdown.Item>
                    {locked ? (<Dropdown.Item onClick={toggleUnlockHandler} >Unlock</Dropdown.Item>) : (<Dropdown.Item onClick={toggleLockHandler} href="#/action-2">Lock</Dropdown.Item>)}
                    <Dropdown.Item onClick={cloneTaskHandler}>Clone</Dropdown.Item>
                    <Dropdown.Item onClick={deleteTaskHandler}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={updateTaskHandler}>Edit</Dropdown.Item>
                </DropdownButton>
            </td>
        </tr>
    </tbody>
}

export default TaskItem