import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#044599',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ArgumentTable = (props) => {
  const args = props.args
  const keys = []
  const values = []

  for (let arg of args) {
    let splitted = arg.split('=')
    keys.push(splitted[0])
    values.push(splitted[1])
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='arguments'>
        <TableHead>
          <StyledTableRow>
            {keys.map(key => <StyledTableCell key={Math.random()}>{key}</StyledTableCell>)}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {values.map(val => <StyledTableCell key={Math.random()}>{val}</StyledTableCell>)}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ArgumentTable