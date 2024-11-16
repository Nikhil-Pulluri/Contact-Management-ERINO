import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Collapse, TextField, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

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
    onDelete(contact._id)
    setDeleteDialogOpen(false)
  }

  return (
    <Card sx={{ maxWidth: 600, width: '100%', mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            {contact.firstname} {contact.lastname}
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
              <div className="flex space-x-3">
                <TextField label="First Name" fullWidth value={editedContact.firstname} onChange={(e) => setEditedContact({ ...editedContact, firstname: e.target.value })} />
                <TextField label="Last Name" fullWidth value={editedContact.lastname} onChange={(e) => setEditedContact({ ...editedContact, lastname: e.target.value })} />
              </div>
              <TextField label="Email" type="email" fullWidth value={editedContact.email} onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })} />
              <div className="flex space-x-3">
                <TextField label="Phone Number" fullWidth value={editedContact.phone} onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })} />
                <TextField label="Company" fullWidth value={editedContact.company} onChange={(e) => setEditedContact({ ...editedContact, company: e.target.value })} />
              </div>
              <TextField label="Job Title" fullWidth value={editedContact.jobtitle} onChange={(e) => setEditedContact({ ...editedContact, jobtitle: e.target.value })} />
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
            Are you sure you want to delete {contact.firstname} {contact.lastname}? This action cannot be undone.
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
