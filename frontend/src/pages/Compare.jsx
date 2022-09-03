import {useSelector} from "react-redux";
import {Fragment, useMemo} from "react";
import TaskCompareCard from "./TaskCompareCard";
import ComparePlotsContainer from "../components/tasks/ComparePlotsContainer";
import Card from "../UI/Card";

import classes from './TaskCompareCard.module.css'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {NavLink} from "react-router-dom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#ADD8E6',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#FF817E',
    }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#044599',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableCellDifferent = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#044599',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        color: 'black',
        fontWeight: 700
    },
}));

const Compare = () => {
    const tasksToCompare = useSelector(state => state.tasks.tasksToCompare);

    const keys = useMemo(() => {
        if (tasksToCompare[0]) {
            return tasksToCompare[0].args.map(pair => {
                return pair.split('=')[0];
            })
        }
        return [];
    }, [tasksToCompare]);

    const values1 = useMemo(() => {
        if (tasksToCompare[0]) {
            return tasksToCompare[0].args.map(pair => {
                return pair.split('=')[1];
            })
        }
        return [];
    }, [tasksToCompare]);

    const values2 = useMemo(() => {
        if (tasksToCompare[1]) {
            return tasksToCompare[1].args.map(pair => {
                return pair.split('=')[1];
            })
        }
        return [];

    }, [tasksToCompare]);

    if (tasksToCompare.length < 2) {
        return <h1>No tasks to compare</h1>;
    }

    return <Fragment>
        <section className={classes.plots}>
            <Card>
            <h1 className={classes.heading}>Comparing tasks ({tasksToCompare.length})</h1>
                <div className={classes.cards}>
                    <h2>{keys.length > 0 ? 'Arguments:' : ''}</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='arguments'>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Task</StyledTableCell>
                                    {keys.map(key => <StyledTableCell key={Math.random()}>{key}</StyledTableCell>)}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell key={Math.random()}><NavLink to={`/tasks/${tasksToCompare[0].id}`}>{tasksToCompare[0].hash}</NavLink></StyledTableCell>
                                    {values1.map((val, i) => {
                                        if (val !== values2[i]) {
                                            return <StyledTableCellDifferent key={Math.random()}>{val}</StyledTableCellDifferent>
                                        }
                                        return <StyledTableCell key={Math.random()}>{val}</StyledTableCell>}
                                    )}
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell key={Math.random()}><NavLink to={`/tasks/${tasksToCompare[1].id}`}>{tasksToCompare[1].hash}</NavLink></StyledTableCell>
                                    {values2.map((val, i) => {
                                        if (val !== values1[i]) {
                                            return <StyledTableCellDifferent key={Math.random()}>{val}</StyledTableCellDifferent>
                                        }
                                        return <StyledTableCell key={Math.random()}>{val}</StyledTableCell>}
                                    )}
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <ComparePlotsContainer tasks={tasksToCompare} />
            </Card>
        </section>
    </Fragment>
}

export default Compare;