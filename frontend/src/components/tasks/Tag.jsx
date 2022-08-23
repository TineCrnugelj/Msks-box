import {Fragment, useState} from "react";
import classes from "./TaskTable.module.css";
import {FaCheck, FaPen, FaTimes} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {putEditTag} from "../../features/tasks/taskSlice";

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

    const closeEdit = () => {
        setTag(task.tag);
        setEditing(false);
    }

    if (editing) {
        return <Fragment>
            <div className={classes.editForm}>
                <input className={classes.tagInput} type='text' value={tag} onChange={tagChangedHandler} />
                <div className={classes.tagBtns}>
                    <FaCheck className={classes.tagSubmitBtn} onClick={submitNewTag} color={'#289800'} size={25} />
                    <FaTimes className={classes.tagCloseBtn} onClick={closeEdit} color={'#8d0000'} size={25} />
                </div>
            </div>
        </Fragment>
    }
    return (
        <Fragment>
            {tag}
            <FaPen className={classes.editButton} onClick={editTagHandler} />
        </Fragment>
    );

};

export default Tag;