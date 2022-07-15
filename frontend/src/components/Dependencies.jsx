import {Fragment} from "react";

const Dependencies = (props) => {
    console.log(props)
    return <Fragment>
        <h3>Dependencies:</h3>
        {props.dependencies.length === 0 ? <p>No dependencies.</p> : props.dependencies.map(dep => <p>{dep}</p>) }
    </Fragment>
}

export default Dependencies;