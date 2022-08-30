import {Fragment} from "react";
import Dependency from "./Dependency";

import classes from './Dependencies.module.css'

const Dependencies = ({dependencies, tag}) => {
    return <Fragment>
        <h3 className={classes.heading} >Dependencies:</h3>
        {dependencies.length === 0 ?
            <p className={'noDeps'}>No dependencies.</p> :
            dependencies.map(dep => (<Dependency key={dep} dep={dep} />))
        }
    </Fragment>
}

export default Dependencies;