import {Fragment, useState} from "react";
import classes from "./TaskTable.module.css";
import {FaCheck, FaPen} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {putEditTag} from "../../features/runs/runSlice";

const Tag = ({task}) => {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [tag, setTag] = useState(task.tag);

    const editTagHandler = () => {
        setEditing(true);
    }

    const submitNewTag = () => {
        dispatch(putEditTag({taskId: task._id, tag: tag}))
        setEditing(false);
    }

    const tagChangedHandler = (e) => {
        setTag(e.target.value);
    }

    if (editing) {
        return <Fragment>
            <div className={classes.editForm}>
                <input className={classes.tagInput} type='text' value={tag} onChange={tagChangedHandler} />
                <FaCheck className={classes.tagSubmitBtn} onClick={submitNewTag} color={'#289800'} />
            </div>
        </Fragment>
    }
    console.log(tag);
    return (
        <Fragment>
            {tag}
            <FaPen className={classes.editButton} onClick={editTagHandler} />
        </Fragment>
    );

};

export default Tag;