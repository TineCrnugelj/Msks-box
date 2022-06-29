import React, { Fragment } from 'react'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRun } from '../features/runs/runSlice'

import classes from './Dashboard.module.css'
import Card from '../UI/Card'
import TaskTable from '../components/TaskTable'
import TaskDetails from '../components/TaskDetails'

function Dashboard() {
    const navigate = useNavigate()
    const showDetails = useSelector(state => state.details.showDetails)
    const { user } = useSelector(state => state.auth)


    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <Fragment>
            <section className={classes.tasks}>
                <Card>
                    <TaskTable />
                </Card>
            </section>
            {showDetails && 
            <section className={classes.tasks}>
                <Card>
                    <TaskDetails />
                </Card>
            </section>}
        </Fragment>
    )
}

export default Dashboard