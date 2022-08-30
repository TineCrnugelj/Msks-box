import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getTask} from "../../features/tasks/taskSlice";
import { FaEye } from 'react-icons/fa';

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
        <FaEye className={classes.btnDetails} onClick={showDetailsHandler} size={25} />
    </p>
}

export default Dependency;