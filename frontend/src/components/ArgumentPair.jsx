import classes from './TaskForm.module.css'

const ArgumentPair = (props) => {

    return <div className={classes.formControlArguments}>
        <div className={classes.keyValueGroup}>
            <label htmlFor="key">Key</label>
            <input type="text" id='key' />
        </div>
        <div className={classes.keyValueGroup}>
            <label htmlFor="value">Value</label>
            <input type="text" id='value' />
        </div>

    </div>



}

export default ArgumentPair;