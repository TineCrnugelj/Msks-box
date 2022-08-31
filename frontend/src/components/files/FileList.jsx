import classes from './FileList.module.css'
import {useSelector, useDispatch} from "react-redux";
import {Fragment, useEffect, useMemo} from "react";
import {getFiles, reset} from "../../features/files/fileSlice";
import Table from 'react-bootstrap/Table';
import FileItem from './FileItem';
import {useNavigate} from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader'
import {useState} from "react";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const FileList = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {files, isLoading, isError, message} = useSelector(state => state.files);
    let [color] = useState("#044599");

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getFiles(id));

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
            taskId={id}
        />
    ));

    const redirectHandler = () => {
        navigate(`/tasks/${id}/add-new-files`);
    }

    if (isLoading) {
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    return <Fragment>
        <div className={classes.heading}>
            <h1>Files</h1>
        </div>
        {filesList.length > 0 ? (<Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Size</th>
            </tr>
            </thead>
            <tbody>
            {filesList}
            </tbody>
        </Table>) : <p>No files</p>}

    </Fragment>
}

export default FileList;