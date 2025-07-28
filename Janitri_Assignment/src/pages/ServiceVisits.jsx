import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material'
import styles from '../styles/TableStyles.module.scss'

const initialFormState = {
  visitId: '',
  engineer: '',
  date: '',
  purpose: '',
  notes: '',
  attachments: null,
}

const ServiceVisits = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialFormState)
  const [isEdit, setIsEdit] = useState(false)
  const [visits, setVisits] = useState([])

  const handleOpen = (visit) => {
    if (visit) {
      setForm(visit)
      setIsEdit(true)
    } else {
      setForm(initialFormState)
      setIsEdit(false)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = () => {
    if (isEdit) {
      setVisits((prev) =>
        prev.map((v) => (v.visitId === form.visitId ? form : v))
      )
    } else {
      setVisits((prev) => [...prev, { ...form, visitId: Date.now().toString() }])
    }
    setOpen(false)
  }

  const handleDelete = (visitId) => {
    setVisits((prev) => prev.filter((v) => v.visitId !== visitId))
  }

  return (
    <div>
      <h2>Service Visit Logs</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)} sx={{ mb: 2 }} disableElevation>
        Add Visit
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
        <Table aria-label="service visits table" className={styles['table-responsive']}>
          <TableHead>
            <TableRow>
              <TableCell>Visit ID</TableCell>
              <TableCell>Engineer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Attachments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits.length > 0 ? (
              visits.map((visit) => (
                <TableRow key={visit.visitId}>
                  <TableCell data-label="Visit ID">{visit.visitId}</TableCell>
                  <TableCell data-label="Engineer">{visit.engineer}</TableCell>
                  <TableCell data-label="Date">{visit.date}</TableCell>
                  <TableCell data-label="Purpose">{visit.purpose}</TableCell>
                  <TableCell data-label="Notes">{visit.notes}</TableCell>
                  <TableCell data-label="Attachments">{visit.attachments ? visit.attachments.name : ''}</TableCell>
                  <TableCell data-label="Actions">
                    <Button size="small" onClick={() => handleOpen(visit)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(visit.visitId)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Visit' : 'Add Visit'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Engineer"
            name="engineer"
            value={form.engineer}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Purpose"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Attachment
            <input type="file" hidden name="attachments" onChange={handleChange} />
          </Button>
          {form.attachments && <Typography variant="body2" sx={{ mt: 1 }}>{form.attachments.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ServiceVisits
