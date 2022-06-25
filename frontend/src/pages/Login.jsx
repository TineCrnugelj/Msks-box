import { useState, useEffect, Fragment } from "react";
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

import classes from './Register.module.css'


const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    let formIsValid = false;

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    formIsValid = email.includes('@') && password !== '';

    return <Fragment>
        <section className={classes.container}>
            <div className={classes.head}>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in</p>
            </div>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} placeholder='Enter your email' onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} placeholder='Enter your password' onChange={onChange} />
                </div>
                <div>
                    <button type="submit" className={classes.btnSubmit} disabled={!formIsValid} >Submit</button>
                </div>
            </form>
        </section>
    </Fragment>

};

export default Login;