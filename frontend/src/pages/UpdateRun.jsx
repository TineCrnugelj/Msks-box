import classes from './AddRun.module.css';
import CloneTaskForm from '../components/CloneTaskForm';

const AddRun = (props) => {
    return <section className={classes.formContainer}>
        <CloneTaskForm />
    </section>
}

export default AddRun