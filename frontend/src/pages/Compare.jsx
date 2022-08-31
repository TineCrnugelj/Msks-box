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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
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
        color: 'red'
    },
}));

const Compare = () => {
    const tasksToCompare = useSelector(state => state.tasks.tasksToCompare);
    const tasksTags = tasksToCompare.map(task => `${task.tag} `);

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

    return <Fragment>
        <section className={classes.plots}>
            <Card>
            <h1 className={classes.heading}>Comparing tasks: {tasksTags}</h1>
                <div className={classes.cards}>
                    <h2>{keys.length > 0 ? 'Arguments:' : ''}</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='arguments'>
                            <TableHead>
                                <StyledTableRow>
                                    {keys.map(key => <StyledTableCell key={Math.random()}>{key}</StyledTableCell>)}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    {values1.map((val, i) => {
                                        if (val !== values2[i]) {
                                            return <StyledTableCellDifferent key={Math.random()}>{val}</StyledTableCellDifferent>
                                        }
                                        return <StyledTableCell key={Math.random()}>{val}</StyledTableCell>}
                                    )}
                                </StyledTableRow>
                                <StyledTableRow>
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