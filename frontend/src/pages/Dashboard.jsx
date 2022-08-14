import React from 'react'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import classes from './Dashboard.module.css'
import Card from '../UI/Card'
import TaskTable from '../components/Tasks/TaskTable'

function Dashboard() {
    const navigate = useNavigate()
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