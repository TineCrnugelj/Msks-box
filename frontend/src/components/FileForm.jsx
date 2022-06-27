import React from 'react';
import { useDropzone } from 'react-dropzone';

import classes from './TaskForm.module.css'

const FileForm = (props) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return <form onSubmit={onSubmitHandler}>
        <h1 className={classes.heading}>Upload a file</h1>
        <div className={classes.formControl} {...getRootProps({ className: 'dropzone' })}>
            <label htmlFor="file">File</label>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
        </aside>
        <button className={classes.btnSubmit} >Submit</button>
    </form>
}

export default FileForm