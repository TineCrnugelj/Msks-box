
import classes from './AddRun.module.css';
import TaskForm from '../components/Tasks/TaskForm';

const AddRun = (props) => {
    return <section className={classes.formContainer}>
        <TaskForm />
    </section>

};

export default AddRun;