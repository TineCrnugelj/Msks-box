import {Fragment} from "react";
import Dependency from "./Dependency";

const Dependencies = (props) => {

    return <Fragment>
        <h3>Dependencies:</h3>
        {props.dependencies.length === 0 ?
            <p className={'noDeps'}>No dependencies.</p> :
            props.dependencies.map(dep => (<Dependency key={dep} tag={dep} />))
        }
    </Fragment>
}

export default Dependencies;