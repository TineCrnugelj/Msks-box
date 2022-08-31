import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getTasks, reset, setFilteredTasks } from "../../features/tasks/taskSlice";
import ClipLoader from 'react-spinners/ClipLoader'
import Actions from "./Actions";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from 'javascript-time-ago';
import classes from './TaskTable.module.css'

import { styled } from '@mui/material/styles';
import en from 'javascript-time-ago/locale/en.json'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Searchbar from "./Searchbar";
import Tag from "./Tag";

TimeAgo.addLocale(en)

const columns = [
    { id: 'tag', label: 'Tag', minWidth: 150 },
    { id: 'entrypoint', label: 'Entrypoint', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 140 },
    { id: 'created', label: 'Created', minWidth: 170 },
    { id: 'updated', label: 'Updated', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 130 },
];

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#044599",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#044599',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const TaskTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [color] = useState("#044599");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    let { tasks, isLoading, isError, message } = useSelector(state => state.tasks);
    let filteredTasks = useSelector(state => state.tasks.filteredTasks);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getTasks());

        return () => {
            dispatch(reset())
        }
    }, []);

    if (isLoading) {
        return <ClipLoader color={color} loading={isLoading} cssOverride={override} size={150} />
    }

    const tasksList = filteredTasks.map(task => (
        <Actions
            key={task._id}
            source={task.repository}
            id={task._id}
            tag={task.tag}
            entrypoint={task.entrypoint}
            status={task.status}
            created={task.created}
            updated={task.updated}
            arguments={task.arguments}
            dependencies={task.dependencies}
            hash={task.hash}
        />
    ));

    const redirectHandler = () => {
        navigate('/tasks/add-task');
    }

    const searchTasks = (searchQuery) => {
        const searchWord = searchQuery.toLowerCase();
        const newFilter = tasks.filter((task) => {
            if (task.tag) {
                return task.tag.toLowerCase().includes(searchWord) ||
                    task.status.toLowerCase().includes(searchWord) ||
                    task.entrypoint.toLowerCase().includes(searchWord);
            }
            else {
                return task.status.toLowerCase().includes(searchWord) ||
                       task.entrypoint.toLowerCase().includes(searchWord);
            }
        });

        dispatch(setFilteredTasks(newFilter));
    }

    function getColor(status) {
        const colors = {
            PENDING: "#044599",
            RUNNING: "#ffd343",
            PREPARING: "#ffa200",
            COMPLETE: "#0d865d",
            FAILED: "#ba3f38",
            ACHIEVED: "#808080",
            UNKNOWN: "#808080"
        };
        return colors[status];
    }

    return (
        <Fragment>
            <div className={classes.header}>
                <h1>Tasks ({tasksList.length})</h1>
                <button className={classes.btnAddTask} onClick={redirectHandler}>+ Add</button>
                <Searchbar onQueryChange={searchTasks} />
            </div>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 700, minHeight: 250 }}>
                    <Table role='table' stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTasks
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((task) => {
                                    return (
                                        <TableRow hover role='table' tabIndex={-1} key={task._id}>
                                            <TableCell role='cell' key={task.id} align={task.align}>
                                                <Tag task={task} />
                                            </TableCell>
                                            <TableCell role='cell' key={task.id} align={task.align}>
                                                {task.entrypoint}
                                            </TableCell>
                                            <TableCell role='cell' key={task.id} align={task.align}>
                                                <span style={{color: getColor(task.status)}}>{task.status}</span>
                                            </TableCell>
                                            <TableCell role='cell' key={task.id} align={task.align}>
                                                <ReactTimeAgo date={new Date(task.created)} locale='en' />
                                            </TableCell>
                                            <TableCell role='cell' key={task.id} align={task.align}>
                                                <ReactTimeAgo date={new Date(task.updated)} locale='en' />
                                            </TableCell>
                                            <TableCell role='cell' key={task.id} align={task.align}>
                                                <Actions
                                                    key={task._id}
                                                    source={task.repository}
                                                    id={task._id}
                                                    tag={task.tag}
                                                    entrypoint={task.entrypoint}
                                                    status={task.status}
                                                    created={task.created}
                                                    updated={task.updated}
                                                    arguments={task.arguments}
                                                    dependencies={task.dependencies}
                                                    hash={task.hash}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    className={classes.pagination}
                    count={filteredTasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {tasksList.length === 0 ?  <h4 className={classes.noTasks}>No tasks found</h4> : ''}
        </Fragment>

    )
};

export default TaskTable