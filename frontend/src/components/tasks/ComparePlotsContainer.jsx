import {useSelector} from "react-redux";
import {Fragment, useMemo} from "react";
import Col from "react-bootstrap/Col";
import ComparePlot from "./ComparePlot";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import classes from './ComparePlotsContainer.module.css';

const ComparePlotsContainer = ({tasks}) => {
    const allPlots = useSelector(state => state.tasks.dataToPlotCompare);

    const plotsData = useMemo(() => {
        if (allPlots.length < 2) {
            return [];
        }

        const parsedPlotsData = [];
        for (let i = 0; i < allPlots[0].length; i++) {
            const name = allPlots[0][i].name;
            for (let j = 0; j < allPlots[1].length; j++) {
                if (name === allPlots[1][j].name) {
                    const data1 = {
                        name: name,
                    }
                    data1[name + ' ' + tasks[0].tag] = allPlots[0][i].data;
                    data1[name + ' ' + tasks[1].tag] = allPlots[1][j].data;

                    const points = [];

                    for (let k = 0; k < data1[name + ' ' + tasks[0].tag].length; k++) {
                        const point = {step: k+1};
                        point[name + ' ' + tasks[0].tag] = data1[name + ' ' + tasks[0].tag][k];
                        point[name + ' ' + tasks[1].tag] = data1[name + ' ' + tasks[1].tag][k];
                        points.push(point);
                    }

                    parsedPlotsData.push(points);
                }
            }
        }
        return parsedPlotsData;
    }, [allPlots]);

    const plotItems = useMemo(() => {
        const plots = [];
        for (const plot of plotsData) {
            plots.push(<Col key={plot.name}><ComparePlot plotData={plot} /></Col>);
        }
        return plots;
    }, [plotsData]);

    return <Fragment>
        <h1 className={classes.heading}>{allPlots.length < 2 ? 'No plots to compare' : `Plots (${plotItems.length})`}</h1>
        <Container>
            <Row>
                {plotItems}
            </Row>
        </Container>
    </Fragment>
}

export default ComparePlotsContainer;