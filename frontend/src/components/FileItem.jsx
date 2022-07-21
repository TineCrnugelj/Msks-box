import Button from 'react-bootstrap/Button';
import classes from './FileItem.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteFile} from "../features/files/fileSlice";

const FileItem = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sizeInMB = (props.size / 1000000).toFixed(2);
    const isImage = props.name.slice(-3) === 'jpg' || props.name.slice(-3) === 'png' || props.name.slice(-4) === 'jpeg';
    const imageName = props.name.split('\\')[1];

    const viewFullSizeHandler = () => {
        navigate('/image/' + imageName);
    }

    const deleteFileHandler = () => {
        dispatch(deleteFile(props.id));
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
            <Button variant='primary'>Download</Button>{' '}
            <Button onClick={deleteFileHandler} variant='primary'>Delete</Button>{' '}
        </td>
    </tr>
}

export default FileItem;