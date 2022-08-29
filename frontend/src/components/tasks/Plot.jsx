import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Fragment, useMemo, useState} from "react";
import Button from 'react-bootstrap/Button';
import classes from './Plot.module.css'

const Plot = ({title, data}) => {
    const [hidden, setHidden] = useState(false);

    const reMappedData = useMemo(() => {
        const newData = [];
        for (let i = 0; i < data.length; i++) {
            let point = {
                step: i
            }
            point[title] = data[i];
            newData.push(point);
        }
        return newData;
    }, []);

    const hideChartHandler = () => {
        setHidden(prevState => !prevState);
    }

    console.log(reMappedData);

    return <Fragment>
        <div className={classes.heading}>
            <h3>{title}</h3>
            <Button className={classes.btnHide} variant='primary' onClick={hideChartHandler}>Hide</Button>
        </div>
        {!hidden &&
            <ResponsiveContainer minHeight={300} minWidth={300} width={'25%'} aspect={1}>
                <LineChart
                    width={500}
                    height={300}
                    data={reMappedData}
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
                    <Line type="monotone" dataKey={title} stroke="#044599" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        }
    </Fragment>
}

export default Plot;