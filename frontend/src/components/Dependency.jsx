import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRunByTag} from "../features/runs/runSlice";
import {setRun} from "../features/runs/runSlice";

const Dependency = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const run = useSelector(state => state.runs.runDetails);

    const showDetailsHandler = (e) => {
        e.preventDefault();

        dispatch(getRunByTag(props.tag));
        setRun(run);

        navigate('/tasks/' + run._id);

    }

    return <p>
        {props.tag}
        <button onClick={showDetailsHandler}>Details</button>
    </p>
}

export default Dependency;