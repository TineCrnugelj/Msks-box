import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getTask} from "../../features/tasks/taskSlice";
import Button from 'react-bootstrap/Button';

import classes from "./Dependency.module.css";

const Dependency = ({dep}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showDetailsHandler = (e) => {
        e.preventDefault();
        dispatch(getTask(dep));
        navigate('/tasks/' + dep);
    }

    return <p>
        {dep}
        <Button className={classes.btnDetails} onClick={showDetailsHandler}>Details</Button>
    </p>
}

export default Dependency;