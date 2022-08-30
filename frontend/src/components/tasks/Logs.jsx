import {useEffect, useState, useMemo, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLogs, resetLogs} from "../../features/tasks/taskSlice";
import {ClipLoader} from "react-spinners";
import Button from "react-bootstrap/Button";

import classes from './Logs.module.css'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const Logs = ({id}) => {
    let [color] = useState("#044599");
    const dispatch = useDispatch();
    const logLines = useSelector(state => state.tasks.logs);
    const {isLoadingLogs, isErrorLogs, messageLogs} = useSelector(state => state.tasks);

    const lines = useMemo(() => {
        if (logLines.length === 0) {
            return <span>No logs</span>
        }
        return logLines.map(line => {
            return <p key={line} className={classes.line}>{line}</p>
        })
    }, [logLines]);

    useEffect(() => {
        if (isErrorLogs) {
            console.log(messageLogs);
        }
        dispatch(getLogs(id));

        return () => {
            dispatch(resetLogs());
        }
    }, []);

    if (isLoadingLogs || logLines == null) {
        return <ClipLoader color={color} loading={isLoadingLogs} cssOverride={override} size={150} />
    }

    return (
        <Fragment>
            <div className={classes.heading}>
                <h1>Output</h1>
            </div>
            <hr />
            <div className={classes.logsList}>
                {lines}
            </div>
        </Fragment>
    );
}

export default Logs;
