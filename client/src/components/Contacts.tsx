import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ContactActions from './ContactOptions'
import { v4 as uuidv4 } from 'uuid'
import Collapse from '@mui/material/Collapse'
import { Box } from '@mui/material'

const handleEdit = () => {
  console.log('edit option called')
}

const handleDelete = () => {
  console.log('delete function called')
}

function createData(fname: string, lname: string, email: string, phnum: number, company: string, job_title: string) {
  const generateId = (): string => {
    return uuidv4() // Generates a UUID
  }

  const id = generateId() // bring it form the mongo db after creating the contact

  return {
    id,
    fname,
    lname,
    email,
    phnum,
    company,
    job_title,
    edit: [
      {
        option: 'Edit',
        path: '/login/contacts/edit',
        icon: '',
      },
      {
        option: 'Delete',
        path: '/login/contacts/delete',
        icon: '',
      },
    ],
  }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.fname}
        </TableCell>
        <TableCell>{row.lname}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phnum}</TableCell>
        <TableCell>{row.company}</TableCell>
        <TableCell>{row.job_title}</TableCell>
      </TableRow>
      {/* i have to replace this portion with the edit options of the contact */}

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <ContactActions contact={row} onEdit={handleEdit} onDelete={handleDelete} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

// this is where we have to give the rows of the table
const rows = [
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
  createData('Nikhil', 'Pulluri', 'testing@gmail.com', 8317533755, 'google', 'SDE'),
]
export default function Contacts() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.phnum} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
