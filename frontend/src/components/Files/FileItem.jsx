import Button from 'react-bootstrap/Button';
import classes from './FileItem.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteFile, downloadFile} from "../../features/files/fileSlice";
import {NavLink} from "react-router-dom";
import Axios from "axios";
import FileDownload from 'js-file-download'
import {Fragment} from "react";

const FileItem = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sizeInMB = (props.size / 1000000).toFixed(2);
    const isImage = props.name.includes('jpg') || props.name.includes('png') || props.name.includes('jpeg');
    const fileName = props.name.split('\\')[1];

    const viewFullSizeHandler = () => {
        navigate('/image/' + fileName);
    }

    const deleteFileHandler = () => {
        dispatch(deleteFile(props.id));
    }

    const downloadHandler = () => {
        dispatch(downloadFile(props.id));

        Axios({
            url: 'http://localhost:3000/' + fileName,
            method: 'GET',
            responseType: 'blob'
        })
            .then((res) => {
                FileDownload(res.data, fileName);
            })
    }

    return <tr>
        <td className={classes.name}>
            <p>{fileName}</p>
            {isImage ?
                <Fragment>
                    <div className={classes.imgContainer}>
                        <img className={classes.img} src={fileName} alt={props.name} />
                    </div>
                </Fragment>
                : ''}
        </td> {/* TODO fix for other path types */}
        <td>{sizeInMB} MB</td>
        <td>
            <Button variant='primary' onClick={downloadHandler}>Download</Button>{' '}
            <Button variant='primary' onClick={deleteFileHandler}>Delete</Button>
        </td>
    </tr>
}

export default FileItem;