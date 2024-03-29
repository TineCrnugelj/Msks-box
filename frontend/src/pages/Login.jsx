import { useState, useEffect, Fragment } from "react";
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import ClipLoader from 'react-spinners/ClipLoader'

import classes from './Register.module.css'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const Login = (props) => {
    let [color] = useState("#044599");
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
            navigate('/tasks')
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
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    formIsValid = email.includes('@') && password !== '';

    return <Fragment>
        <section className={classes.container}>
            <div className={classes.head}>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in</p>
                <div className={classes.noAccount}>
                    <p>Don't have an account? Register&nbsp;</p>
                    <NavLink to={'/register'}>here</NavLink>
                </div>
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
                    <button type="submit" className={classes.btnSubmit} disabled={!formIsValid} >Login</button>
                </div>
            </form>
        </section>
    </Fragment>

};

export default Login;