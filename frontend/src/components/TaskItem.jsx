import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import classes from './TaskItem.module.css'
import { FaArrowDown } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa'
import { FaLockOpen } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { showDetails } from '../features/details/detailsSlice'
import { lockRun, unlockRun } from '../features/runs/runSlice'
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
            arguments: props.arguments
        }
        dispatch(setRun(run));
    }

    const toggleLockHandler = (e) => {
        e.preventDefault()
        dispatch(lockRun(props.id))
        setLocked(true)
        // show a toast
        toast.success('Task locked.', { autoClose: 2000 })
    }

    const toggleUnlockHandler = () => {
        dispatch(unlockRun(props.id))
        setLocked(false)
    }

    const cloneTaskHandler = () => {
        navigate(`/update-run?source=${props.source}&entrypoint=${props.entrypoint}&tag=${props.tag}&arguments=${props.arguments}`)
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
                    {locked ? (<Dropdown.Item onClick={toggleUnlockHandler} >Unlock task</Dropdown.Item>) : (<Dropdown.Item onClick={toggleLockHandler} href="#/action-2">Lock task</Dropdown.Item>)}
                    <Dropdown.Item onClick={cloneTaskHandler}>Clone</Dropdown.Item>
                </DropdownButton>
            </td>
        </tr>
    </tbody>
}

export default TaskItem