import { useNavigate } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { deleteRun } from '../features/runs/runSlice'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Actions = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDetailsHandler = () => {
        navigate('/tasks/' + props.hash);
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

    return (
        <DropdownButton id="dropdown-basic-button" title="Options">
            <Dropdown.Item onClick={toggleDetailsHandler} >Details</Dropdown.Item>
            <Dropdown.Item onClick={cloneTaskHandler}>Clone</Dropdown.Item>
            <Dropdown.Item onClick={deleteTaskHandler}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={updateTaskHandler}>Edit</Dropdown.Item>
        </DropdownButton>
    );
}

export default Actions;
