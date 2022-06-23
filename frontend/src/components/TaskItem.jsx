
import classes from './TaskItem.module.css'

const TaskItem = (props) => {
    return <tr className={classes.task}>
        <td>{props.entrypoint}</td>
        <td>{props.status}</td>
        <td>{props.created}</td>
        <td>{props.updated}</td>
    </tr>
}

export default TaskItem