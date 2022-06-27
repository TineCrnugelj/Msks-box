
import classes from './AddRun.module.css';
import TaskForm from '../components/TaskForm';
import FileForm from '../components/FileForm';
import { Fragment } from 'react';

const AddRun = (props) => {
    return <Fragment>
        <section className={classes.formContainer}>
            <TaskForm />
        </section>
        <section className={classes.formContainer}>
            <FileForm />
        </section>
    </Fragment>
};

export default AddRun;