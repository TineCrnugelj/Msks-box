import { useState } from 'react'
import classes from './TaskForm.module.css'

const ArgumentPair = (props) => {
    const [key, setKey] = useState(props.key1 ? props.key1 : '')
    const [value, setValue] = useState(props.value ? props.value : '')

    const keyChangedHandler = (e) => {
        setKey(e.target.value)
    }
    const valueChangedHandler = (e) => {
        setValue(e.target.value)
    }

    return <div className={classes.formControlArguments}>
        <div className={classes.keyValueGroup}>
            <label htmlFor="key">Key</label>
            <input value={key} onChange={keyChangedHandler} type="text" id={'key' + props.index} />
        </div>
        <div className={classes.keyValueGroup}>
            <label htmlFor="value">Value</label>
            <input value={value} onChange={valueChangedHandler} type="text" id={'value' + props.index} />
        </div>

    </div>



}

export default ArgumentPair;