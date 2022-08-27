import { FaUser, FaHome, FaSignInAlt, FaSignOutAlt, FaFile } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

import classes from './Header.module.css'
import { Fragment } from 'react'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/tasks')
    }

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/tasks'>
                            <FaHome /> Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/compare'>
                           Compare
                        </NavLink>
                    </li>
                    {!user ? (<Fragment>
                        <li>
                            <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/login'>
                                <FaSignInAlt /> Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/register'>
                                <FaUser />Register
                            </NavLink>
                        </li>
                    </Fragment>) : (
                        <li>
                            <a className={classes.logoutLink} onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header