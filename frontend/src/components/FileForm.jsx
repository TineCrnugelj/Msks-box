import { useState } from 'react';
import classes from './TaskForm.module.css'
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { createFile } from '../features/files/fileSlice';
import ProgressBar from "react-bootstrap/ProgressBar";

const FileForm = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState();
    const [fileName, setFileName] = useState('Choose file')

    const [uploadPercentage, setUploadPercentage] = useState(0);

    let [fileUploaded, setFileUploaded] = useState(false);

    const onSubmitHandler = async e => {
        e.preventDefault()
        
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                if (percent <= 100) {
                    setUploadPercentage(percent);
                }
                if (percent === 100) {
                    toast.success('Files uploaded successfully!', {autoClose: 1500});
                    setUploadPercentage(0)
                }
            }
        }

        const data = {
            formData,
            options
        }

        dispatch(createFile(data))

        setFileName('')
        setFileUploaded(false)
    }

    const onFileChange = (e) => {
        setFileUploaded(true)
        setFiles(e.target.files)

        let fileNames = '';
        for (let file of e.target.files) {
            fileNames += file.name + ' ';
        }
        setFileName(fileNames);
        setFileUploaded(true);
    }

    return <section className={classes.formContainer}>
        <form onSubmit={onSubmitHandler}>
            <h1 className={classes.heading}>Upload a file</h1>
            <div className={classes.formControl}>
                <input type="file" name="file" id="file" onChange={onFileChange} multiple />
                <label htmlFor="File">{fileName}</label>
                {uploadPercentage > 0 && uploadPercentage <= 100 ? <ProgressBar className={classes.progressBar} now={uploadPercentage} label={`${uploadPercentage}%`} /> : ''}
            </div>
            <button className={classes.btnSubmit} disabled={!fileUploaded}>Upload</button>
        </form>
    </section>



}

export default FileForm;