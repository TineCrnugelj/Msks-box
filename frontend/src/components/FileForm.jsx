import { useState } from 'react';
import classes from './TaskForm.module.css'
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { createFile } from '../features/files/fileSlice';
import Card from '../UI/Card'

const FileForm = (props) => {
    const dispatch = useDispatch()
    const [files, setFiles] = useState();
    const [fileName, setFileName] = useState('Choose file')

    let [fileUploaded, setFileUploaded] = useState(false);

    const onSubmitHandler = async e => {
        e.preventDefault()
        
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        // formData.append('file', files)
        
        dispatch(createFile(formData))

        setFileName('')
        setFileUploaded(false)
        toast.success('File uploaded successfully!', {autoClose: 1500});
    }

    const onFileChange = (e) => {
        setFileUploaded(true)
        setFiles(e.target.files)

        let fileNames = '';
        for (let file of e.target.files) {
            fileNames += file.name + ' ';
        }
        setFileName(fileNames);
    }

    return <section className={classes.formContainer}>
        <form onSubmit={onSubmitHandler}>
            <h1 className={classes.heading}>Upload a file</h1>
            <div className={classes.formControl}>
                <input type="file" name="file" id="file" onChange={onFileChange} multiple />
                <label htmlFor="File">{fileName}</label>
            </div>
            <button className={classes.btnSubmit} disabled={!fileUploaded}>Upload</button>
        </form>
    </section>



}

export default FileForm;