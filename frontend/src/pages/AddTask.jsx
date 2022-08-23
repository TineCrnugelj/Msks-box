
import classes from './AddTask.module.css';
import TaskForm from '../components/tasks/TaskForm';

const AddTask = () => {
    return <section className={classes.formContainer}>
        <TaskForm />
    </section>

};

export default AddTask;