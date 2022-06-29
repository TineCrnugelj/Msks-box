import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import ClipLoader from 'react-spinners/ClipLoader'

import classes from './Register.module.css'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const Register = (props) => {
    let [color, setColor] = useState('#044599');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    let isFormValid = false;

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

        if (password !== password2) {
            toast.error('Passwords do not match');
        }
        else {
            const userData = {
                name, email, password
            }
            dispatch(register(userData))
        }
    }

    isFormValid = name.trim() !== '' && email.trim().includes('@') && password.trim() !== '' && password2.trim() !== '';

    if (isLoading) {
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    return <Fragment>
        <section className={classes.container}>
            <div className={classes.head}>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </div>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder='Enter your name' onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder='Enter your email' onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Enter your password' onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="password2">Confirm password</label>
                    <input type="password" name="password2" id="password2" placeholder='Confirm password' onChange={onChange} />
                </div>
                <div>
                    <button className={classes.btnSubmit} type="submit" disabled={!isFormValid} >Submit</button>
                </div>
            </form>
        </section>
    </Fragment>

};

export default Register;