
import classes from './AddFile.module.css';
import FileForm from "../components/files/FileForm";

const AddFile = () => {
    return <section className={classes.formContainer}>
        <FileForm />
    </section>

};

export default AddFile;