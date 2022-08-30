import {Fragment, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDataToPlot, resetPlots} from "../../features/tasks/taskSlice";
import ClipLoader from "react-spinners/ClipLoader";
import Plot from './Plot';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};


const Plots = ({id}) => {
    let [color] = useState("#044599");
    const dispatch = useDispatch();
    const dataToPlot = useSelector(state => state.tasks.dataToPlot);
    const { isLoadingPlots, isErrorPlots, messagePlots } = useSelector(state => state.tasks);

    useEffect(() => {
        if (isErrorPlots) {
            console.log(messagePlots)
        }
        dispatch(getDataToPlot(id));

        return () => {
            dispatch(resetPlots());
        }
    }, []);

    const plotItems = useMemo(() => {
        const plots = [];
        for (const plot of dataToPlot) {
            plots.push(<Col key={plot.name}><Plot key={plot.name} title={plot.name} data={plot.data} /></Col>);
        }
        return plots;
    }, [dataToPlot]);

    if (isLoadingPlots) {
        return <ClipLoader color={color} loading={isLoadingPlots} cssOverride={override} size={150} />
    }

    return <Fragment>
        <h1>Plots ({Object.keys(dataToPlot).length})</h1>
        <Container>
            <Row>
                {plotItems}
            </Row>
        </Container>
    </Fragment>
};

export default Plots;