import classes from './AddRun.module.css';
import CloneTaskForm from '../components/tasks/CloneTaskForm';

const AddRun = () => {
    return <section className={classes.formContainer}>
        <CloneTaskForm />
    </section>
}

export default AddRun