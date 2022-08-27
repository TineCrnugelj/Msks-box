import {useSelector} from "react-redux";
import {Fragment} from "react";
import TaskCompareCard from "./TaskCompareCard";
import Container from 'react-bootstrap/Container';
import ComparePlotsContainer from "../components/tasks/ComparePlotsContainer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "../UI/Card";

import classes from './TaskCompareCard.module.css'

const Compare = () => {
    const tasksToCompare = useSelector(state => state.tasks.tasksToCompare);
    const tasksTags = tasksToCompare.map(task => `${task.tag} `);

    const cards = tasksToCompare.map(task => <Col><TaskCompareCard
        id={task.id}
        status={task.status}
        entrypoint={task.entrypoint}
        args={task.args}
        source={task.source}
        tag={task.tag}
        created={task.created}
        updated={task.updated}
        commit={task.commit}
    /></Col>)

    return <Fragment>
        <h1 className={classes.heading}>Comparing tasks: {tasksTags}</h1>
        <Container>
            <Row>
                {cards}
            </Row>
        </Container>
        <section className={classes.plots}>
            <Card>
                <ComparePlotsContainer tasks={tasksToCompare} />
            </Card>
        </section>
    </Fragment>
}

export default Compare;