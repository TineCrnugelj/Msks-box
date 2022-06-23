
import classes from './AddRun.module.css';
import TaskForm from '../components/TaskForm';
import { Fragment } from 'react';

const AddRun = (props) => {
    return <Fragment>
        <section className={classes.formContainer}>
            <TaskForm />
        </section>
    </Fragment>
};

export default AddRun;