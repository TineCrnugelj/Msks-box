import { useNavigate } from "react-router-dom"
import {useDispatch} from 'react-redux'
import {addToCompare, deleteTask, getDataToPlotCompare} from '../../features/tasks/taskSlice'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";

const Actions = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDetailsHandler = () => {
        navigate('/tasks/' + props.id);
    }

    const cloneTaskHandler = () => {
        navigate(`/update-task?action=clone&source=${props.source}&entrypoint=${props.entrypoint}&tag=${props.tag}&arguments=${props.arguments}`)
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTask(props.id))
    }

    const addToCompareHandler = () => {
        const task = {
            id: props.id,
            source: props.source,
            entrypoint: props.entrypoint,
            tag: props.tag,
            args: props.arguments,
            created: props.created,
            updated: props.updated,
            status: props.status,
            commit: props.commit,
        }
        dispatch(addToCompare(task));
        dispatch(getDataToPlotCompare(task.id))
        toast.success('Task added to compare', {autoClose: 1500});
    }

    return (
        <DropdownButton id="dropdown-basic-button" title="Options">
            <Dropdown.Item onClick={toggleDetailsHandler} >Details</Dropdown.Item>
            <Dropdown.Item onClick={cloneTaskHandler}>Clone</Dropdown.Item>
            <Dropdown.Item onClick={deleteTaskHandler}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={addToCompareHandler}>Add to compare</Dropdown.Item>
        </DropdownButton>
    );
}

export default Actions;
