import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRun} from "../features/runs/runSlice";
import Button from 'react-bootstrap/Button';

import classes from "./Dependency.module.css";

const Dependency = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showDetailsHandler = (e) => {
        e.preventDefault();

        dispatch(getRun(props.tag));

        navigate('/tasks/' + props.tag);
    }

    return <p>
        {props.tag}
        <Button className={classes.btnDetails} onClick={showDetailsHandler}>Details</Button>
    </p>
}

export default Dependency;