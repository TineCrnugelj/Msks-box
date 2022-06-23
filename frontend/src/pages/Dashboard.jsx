import React from 'react'

import classes from './Dashboard.module.css'
import Card from '../UI/Card'
import TaskTable from '../components/TaskTable'

function Dashboard() {

    return (
        <section className={classes.tasks}>
            <Card>
                <TaskTable />
            </Card>
        </section>
    )
}

export default Dashboard