import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getRunByTag} from "../features/runs/runSlice";

const Dependency = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showDetailsHandler = (e) => {
        e.preventDefault();

        dispatch(getRunByTag(props.tag));


    }

    return <p>
        {props.tag}
        <button onClick={showDetailsHandler}>Details</button>
    </p>
}

export default Dependency;