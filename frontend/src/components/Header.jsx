import { FaUser, FaHome, FaSignInAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

import classes from './Header.module.css'

function Header() {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/'>
                            <FaHome /> Runs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/login'>
                            <FaSignInAlt /> Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/register'>
                            <FaUser /> Register
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </header>
    )
}

export default Header