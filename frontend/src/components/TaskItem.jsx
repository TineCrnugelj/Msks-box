
import classes from './TaskItem.module.css'
import {FaArrowDown} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { showDetails } from '../features/details/detailsSlice'

import {setRun} from '../features/runs/runSlice'


const TaskItem = (props) => {
    const dispatch = useDispatch();

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

    return <tbody>
        <tr className={classes.task}>
            <td>{props.tag}</td>
            <td>{props.entrypoint}</td>
            <td>{props.status}</td>
            <td>{props.created}</td>
            <td>{props.updated}</td>
            <button onClick={toggleDetailsHandler} className={classes.btnDetails}><FaArrowDown /> Details</button>
        </tr>
    </tbody>
}

export default TaskItem