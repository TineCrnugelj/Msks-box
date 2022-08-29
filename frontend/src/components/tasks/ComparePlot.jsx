import classes from "./Plot.module.css";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Fragment} from "react";

const ComparePlot = ({plotData}) => {

    const dataKeys = Object.keys(plotData[0]);
    const title = dataKeys[1].split(' ')[0];

    return <Fragment>
        <div className={classes.heading}>
            <h3>{title}</h3>
        </div>
        <ResponsiveContainer minHeight={300} minWidth={300} width={'25%'} aspect={1}>
            <LineChart
                width={500}
                height={300}
                data={plotData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 25,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={dataKeys[1]} stroke="#044599" dot={false} />
                <Line type="monotone" dataKey={dataKeys[2]} stroke="#f54242" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </Fragment>
}

export default ComparePlot;