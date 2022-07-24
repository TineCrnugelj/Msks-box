import Button from 'react-bootstrap/Button';
import classes from './FileItem.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteFile, downloadFile} from "../features/files/fileSlice";
import TaskForm from "./TaskForm.jsx";

const FileItem = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sizeInMB = (props.size / 1000000).toFixed(2);
    const isImage = props.name.includes('jpg') || props.name.includes('png') || props.name.includes('jpeg');
    const imageName = props.name.split('\\')[1];

    const viewFullSizeHandler = () => {
        navigate('/image/' + imageName);
    }

    const deleteFileHandler = () => {
        dispatch(deleteFile(props.id));
    }

    const downloadHandler = () => {
        dispatch(downloadFile(props.id));
    }

    return <tr>
        <td className={classes.name}>
            <p>{imageName}</p>
            {isImage ?
                <div className={classes.imgContainer}>
                    <img className={classes.img} src={imageName} alt={props.name} />
                </div>
                : ''}
        </td> {/* TODO fix for other path types */}
        <td>{sizeInMB} MB</td>
        <td>
            <a href={"1658406140226-Jun21_4b.jpg"} onClick={downloadHandler} download={"1658406140226-Jun21_4b.jpg"}>Download</a>
        </td>
    </tr>
}

export default FileItem;