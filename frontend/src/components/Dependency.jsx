import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRunByTag} from "../features/runs/runSlice";
import Button from 'react-bootstrap/Button';

import classes from "./Dependency.module.css";

const Dependency = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const run = useSelector(state => state.runs.runDetails);

    const showDetailsHandler = (e) => {
        e.preventDefault();

        dispatch(getRunByTag(props.tag));
        console.log(run._id);

        navigate('/tasks/' + run._id);
    }

    return <p>
        {props.tag}
        <Button className={classes.btnDetails} onClick={showDetailsHandler}>Details</Button>
    </p>
}

export default Dependency;