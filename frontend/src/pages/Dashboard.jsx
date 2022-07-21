import React, { Fragment } from 'react'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import classes from './Dashboard.module.css'
import Card from '../UI/Card'
import TaskTable from '../components/TaskTable'

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
        <section className={classes.tasks}>
            <Card>
                <TaskTable />
            </Card>
        </section>
    )
}

export default Dashboard