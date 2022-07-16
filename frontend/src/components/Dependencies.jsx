import {Fragment} from "react";

const Dependencies = (props) => {

    const clickTagHandler = () => {
        console.log('click');
    }

    return <Fragment>
        <h3>Dependencies:</h3>
        {props.dependencies.length === 0 ? <p>No dependencies.</p> : props.dependencies.map(dep => (<p key={Math.random()}>{dep}  <a href='#' onClick={clickTagHandler}>Details</a></p>)) }
    </Fragment>
}

export default Dependencies;