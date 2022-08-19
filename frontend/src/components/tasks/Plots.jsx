import {Fragment, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDataToPlot, getRun, resetPlots} from "../../features/runs/runSlice";
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
    const dataToPlot = useSelector(state => state.runs.dataToPlot);
    const { isLoadingPlots, isErrorPlots, messagePlots } = useSelector(state => state.runs);

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
        for (const key of Object.keys(dataToPlot)) {
            plots.push(<Col key={key}><Plot key={key} title={key} data={dataToPlot[key]} /></Col>);
        }
        return plots;
    }, [dataToPlot]);

    if (isLoadingPlots) {
        return <ClipLoader color={color} loading={isLoadingPlots} cssOverride={override} size={150} />
    }

    return <Fragment>
        <h1>Charts ({Object.keys(dataToPlot).length})</h1>
        <Container>
            <Row>
                {plotItems}
            </Row>
        </Container>
    </Fragment>
};

export default Plots;