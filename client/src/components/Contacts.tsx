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
import Collapse from '@mui/material/Collapse'
import { Box } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'

interface Contact {
  _id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  company: string
  jobtitle: string
  __v: number
}

interface ContactsResponse {
  success: boolean
  contacts: Array<{
    _id: string
    firstname: string
    lastname: string
    email: string
    phone: string
    company: string
    jobtitle: string
    __v: number
  }>
  msg: string
}

const handleEdit = async (updatedContact: Contact) => {
  try {
    const response = await fetch(`http://localhost:4000/contacts/${updatedContact._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const data: ContactsResponse = await response.json()

    console.log(data)
  } catch (error) {
    console.error('Error updating contact:', error)
    return []
  }
}

const handleDelete = async (deleteId: string) => {
  try {
    const response = await fetch(`http://localhost:4000/contacts/${deleteId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const data: ContactsResponse = await response.json()

    console.log(data)
  } catch (error) {
    console.error('Error updating contact:', error)
    return []
  }
}

function Row(props: { row: Contact }) {
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
          {row.firstname}
        </TableCell>
        <TableCell>{row.lastname}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.company}</TableCell>
        <TableCell>{row.jobtitle}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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

const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await fetch('http://localhost:4000/contacts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const data: ContactsResponse = await response.json()
    return data.contacts
  } catch (error) {
    console.error('Error retrieving contacts:', error)
    return []
  }
}

export default function Contacts() {
  const [rows, setRows] = React.useState<Contact[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContacts()
      data.sort((a, b) => {
        return a.firstname.localeCompare(b.firstname)
      })
      setRows(data)
    }

    fetchData()

    const intervalId = setInterval(fetchData, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    console.log(event)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <span className="font-bold">First Name</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Last Name</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Email</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Phone Number</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Company</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Job Title</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
