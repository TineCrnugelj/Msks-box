import { useNavigate } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { deleteTask } from '../../features/tasks/taskSlice'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

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

    return (
        <DropdownButton id="dropdown-basic-button" title="Options">
            <Dropdown.Item onClick={toggleDetailsHandler} >Details</Dropdown.Item>
            <Dropdown.Item onClick={cloneTaskHandler}>Clone</Dropdown.Item>
            <Dropdown.Item onClick={deleteTaskHandler}>Delete</Dropdown.Item>
        </DropdownButton>
    );
}

export default Actions;
