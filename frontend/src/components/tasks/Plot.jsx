import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Fragment, useMemo} from "react";

const Plot = ({title, data}) => {

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

    console.log(reMappedData);

    return <Fragment>
        <h3>{title}</h3>
        <ResponsiveContainer width={'25%'} aspect={1}>
            <LineChart
                width={500}
                height={300}
                data={reMappedData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={title} stroke="#044599" />
            </LineChart>
        </ResponsiveContainer>
    </Fragment>
}

export default Plot;