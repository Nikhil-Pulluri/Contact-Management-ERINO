import { Stack, TextField, Button, Box } from '@mui/material'
import { useState } from 'react'
import { Save } from 'lucide-react'

interface Contact {
  _id: string
  fname: string
  lname: string
  email: string
  phnum: string
  company: string
  job_title: string
}
export default function Add() {
  const [newContact, setNewContact] = useState<Contact>({
    _id: '',
    fname: '',
    lname: '',
    email: '',
    phnum: '',
    company: '',
    job_title: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:4000/addcontact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      })
      const data = await res.json()
      console.log(data)

      if (data) {
        setNewContact((prevContact) => ({
          ...prevContact,
          id: data.id,
        }))
        console.log(newContact)
      }
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center space-y-5">
        <div className="text-3xl font-bold">Add New Contact</div>
        <div>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <div className="flex space-x-3">
                <TextField label="First Name" fullWidth value={newContact.fname} onChange={(e) => setNewContact({ ...newContact, fname: e.target.value })} />
                <TextField label="Last Name" fullWidth value={newContact.lname} onChange={(e) => setNewContact({ ...newContact, lname: e.target.value })} />
              </div>
              <TextField label="Email" type="email" fullWidth value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
              <div className="flex space-x-3">
                <TextField label="Phone Number" fullWidth value={newContact.phnum} onChange={(e) => setNewContact({ ...newContact, phnum: e.target.value })} />
                <TextField label="Company" fullWidth value={newContact.company} onChange={(e) => setNewContact({ ...newContact, company: e.target.value })} />
              </div>
              <TextField label="Job Title" fullWidth value={newContact.job_title} onChange={(e) => setNewContact({ ...newContact, job_title: e.target.value })} />
              <Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
                Save Contact
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  )
}
