import classes from './FileList.module.css'
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect} from "react";
import {getFiles, reset} from "../features/files/fileSlice";
import Table from 'react-bootstrap/Table';
import FileItem from './FileItem';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

const FileList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {files, isLoading, isError, message} = useSelector(state => state.files);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getFiles());

        return () => {
            dispatch(reset());
        }

    }, []);

    const filesList = files.map(file => (
        <FileItem
            key={file._id}
            id={file._id}
            name={file.metadataPath}
            size={file.size}
        />
    ));

    const redirectHandler = () => {
        navigate('/files/new-file');
    }

    return <Fragment>
        <div className={classes.heading}>
            <h1>My Files</h1>
            <button className={classes.btnAddFile} onClick={redirectHandler}>+ New file</button>
        </div>
        <Table striped>
            <thead>
            <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {filesList}
            </tbody>
        </Table>
    </Fragment>
}

export default FileList;