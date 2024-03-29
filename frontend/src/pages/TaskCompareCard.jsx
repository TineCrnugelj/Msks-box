import Card from "../UI/Card";
import ArgumentTable from "../components/tasks/ArgumentTable";
import classes from './TaskCompareCard.module.css'
import {useDispatch} from "react-redux";
import {removeFromCompare} from "../features/tasks/taskSlice";
import Button from "react-bootstrap/Button";

const TaskCompareCard = ({id, status, entrypoint, args, source, tag, created, updated, commit}) => {
    const dispatch = useDispatch();

    const removeCardHandler = () => {
        dispatch(removeFromCompare(id))
    }

    return <section className={classes.cardWidth}>
        <Card>
            <div className={classes.cardHead}>
                <h1 className={classes.heading}>{tag ? tag : '/'}</h1>
            </div>
            <h3>Arguments:</h3>
            {args.length > 0 ? <ArgumentTable args={args}/> : <p>No arguments</p>}
            <Button onClick={removeCardHandler} className={classes.removeBtn}>Remove</Button>
        </Card>
    </section>
}

export default TaskCompareCard;