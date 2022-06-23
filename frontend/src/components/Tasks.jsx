import TaskItem from "./TaskItem";

const Tasks = (props) => {
    return <section>
        {DUMMY_TASKS.map(task => <TaskItem key={task._id} entrypoint={task.entrypoint} />)}
    </section>
}

export default Tasks