import Button from 'react-bootstrap/Button';
import classes from './FileItem.module.css';
import { FaDownload } from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {deleteFile, downloadFile} from "../../features/files/fileSlice";
import Axios from "axios";
import FileDownload from 'js-file-download'
import {Fragment, useMemo} from "react";

const API_URL = 'http://localhost:3000/';

const FileItem = ({id, name, size}) => {
    const dispatch = useDispatch();
    let sizeInMB = (size / 1000000).toFixed(2);
    const os = useMemo(() => {
        if (window.navigator.appVersion.indexOf('Win') !== -1) {
            return 'Windows';
        }
        if (window.navigator.appVersion.indexOf('Linux') !== -1) {
            return 'Linux';
        }
    })
    const isImage = useMemo(() => {
        const imageName = name.toLowerCase();
        if (imageName.includes('jpg') || imageName.includes('png') || imageName.includes('jpeg')) {
            return true;
        }
        return false;
    }, [name]);
    const fileName = os === 'Windows' ? name.split('\\')[1] : name.split('/');

    if (sizeInMB.toString() === '0.00') {
        sizeInMB = '0.01';
    }

    const deleteFileHandler = () => {
        dispatch(deleteFile(id));
    }

    const downloadHandler = () => {
        dispatch(downloadFile(id));

        Axios({
            url: API_URL + fileName,
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
                        <img className={classes.img} src={fileName} alt={name} />
                    </div>
                </Fragment>
                : ''}
        </td> {/* TODO fix for other path types */}
        <td>{sizeInMB} MB</td>
        <td>
            <Button variant='primary' onClick={downloadHandler}>Download</Button>{' '}
        </td>
    </tr>
}

export default FileItem;