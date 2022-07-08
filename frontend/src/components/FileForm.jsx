import { useState } from 'react';
import classes from './TaskForm.module.css'
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { createFile } from '../features/files/fileSlice';
import Spinner from './Spinner';

const FileForm = (props) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('Choose file')
    const [uploadedFile, setUploadedFile] = useState({})

    let [fileUploaded, setFileUploaded] = useState(false);

    const onSubmitHandler = async e => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('file', file)
        
        dispatch(createFile(formData))

        setFileName('')
        setFileUploaded(false)
        toast.success('File uploaded successfully!')
    }

    const onFileChange = (e) => {
        setFileUploaded(true)
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)        
    }

    return <form onSubmit={onSubmitHandler}>
        <h1 className={classes.heading}>Upload a file</h1>
        <div className={classes.formControl}>
            <input type="file" name="file" id="file" onChange={onFileChange} />
            <label htmlFor="File">{fileName}</label>
        </div>
        <button className={classes.btnSubmit} disabled={!fileUploaded}>Upload</button>
    </form>

}

export default FileForm