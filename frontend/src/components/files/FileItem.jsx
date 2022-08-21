import {useDispatch} from "react-redux";
import {deleteFile, downloadFile} from "../../features/files/fileSlice";
import Axios from "axios";
import {FaDownload} from "react-icons/fa";
import FileDownload from 'js-file-download'
import {Fragment, useMemo} from "react";
import classes from './FileItem.module.css'

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
        return imageName.includes('jpg') || imageName.includes('png') || imageName.includes('jpeg');
    }, [name]);

    const fileName = os === 'Windows' ? name.split('\\')[1] : name.split('/')[1];

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
                        <img className={classes.img} src={'/' + fileName} alt={fileName} />
                    </div>
                </Fragment>
                : ''}
        </td>
        <td>{sizeInMB} MB</td>
        <td>
            <FaDownload className={classes.downloadBtn} onClick={downloadHandler} size={25} />{' '}
        </td>
    </tr>
}

export default FileItem;