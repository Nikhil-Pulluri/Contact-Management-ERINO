import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Collapse, TextField, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface Contact {
  fname: string
  lname: string
  email: string
  phnum: number
  company: string
  job_title: string
}

interface ContactActionsProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
}

export default function ContactActions({ contact, onEdit, onDelete }: ContactActionsProps) {
  const [expanded, setExpanded] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editedContact, setEditedContact] = useState<Contact>(contact)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEdit(editedContact)
    setExpanded(false)
  }

  const handleDeleteConfirm = () => {
    onDelete(contact.email) // Assuming email is a unique identifier for deletion
    setDeleteDialogOpen(false)
  }

  return (
    <Card sx={{ maxWidth: 600, width: '100%', mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            {contact.fname} {contact.lname}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="primary" startIcon={expanded ? <ChevronUp /> : <ChevronDown />} onClick={handleExpandClick}>
              Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<Trash2 />} onClick={() => setDeleteDialogOpen(true)}>
              Delete
            </Button>
          </Stack>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box component="form" onSubmit={handleEditSubmit} sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <TextField label="First Name" fullWidth value={editedContact.fname} onChange={(e) => setEditedContact({ ...editedContact, fname: e.target.value })} />
              <TextField label="Last Name" fullWidth value={editedContact.lname} onChange={(e) => setEditedContact({ ...editedContact, lname: e.target.value })} />
              <TextField label="Email" type="email" fullWidth value={editedContact.email} onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })} />
              <TextField label="Phone Number" fullWidth value={editedContact.phnum} onChange={(e) => setEditedContact({ ...editedContact, phnum: +e.target.value })} />
              <TextField label="Company" fullWidth value={editedContact.company} onChange={(e) => setEditedContact({ ...editedContact, company: e.target.value })} />
              <TextField label="Job Title" fullWidth value={editedContact.job_title} onChange={(e) => setEditedContact({ ...editedContact, job_title: e.target.value })} />
              <Button type="submit" variant="contained" color="primary" startIcon={<Edit />}>
                Save Changes
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </CardContent>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {contact.fname} {contact.lname}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
