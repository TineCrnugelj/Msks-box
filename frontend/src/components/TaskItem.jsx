import { useState } from 'react'
import classes from './TaskItem.module.css'
import {FaArrowDown} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
import {FaLockOpen} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { showDetails } from '../features/details/detailsSlice'
import { lockRun, unlockRun } from '../features/runs/runSlice'
import { toast } from 'react-toastify'


import {setRun} from '../features/runs/runSlice'


const TaskItem = (props) => {
    const dispatch = useDispatch();
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
        toast.success('Task locked.', {autoClose: 2000})
    }

    const toggleUnlockHandler = () => {
        dispatch(unlockRun(props.id))
        setLocked(false)
    }

    return <tbody>
        <tr className={classes.task}>
            <td>{props.tag}</td>
            <td>{props.entrypoint}</td> 
            <td>{props.status}</td>
            <td>{props.created}</td>
            <td>{props.updated}</td>
            <div className={classes.actions}>
                <button onClick={toggleDetailsHandler} className={classes.btnDetails}><FaArrowDown /> Details</button>
                {locked ? (<button onClick={toggleUnlockHandler} className={classes.btnDetails}>Unlock <FaLockOpen /></button>) : (<button onClick={toggleLockHandler} className={classes.btnDetails}>Lock <FaLock /></button>)}
                
            </div>
        </tr>
    </tbody>
}

export default TaskItem