import classes from './AddTask.module.css';
import CloneTaskForm from '../components/tasks/CloneTaskForm';

const AddTask = () => {
    return <section className={classes.formContainer}>
        <CloneTaskForm />
    </section>
}

export default AddTask