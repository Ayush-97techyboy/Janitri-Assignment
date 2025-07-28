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
  alertId: '',
  device: '',
  date: '',
  alertType: '',
  description: '',
  photo: null,
}

const AlertsPhotoLogs = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialFormState)
  const [isEdit, setIsEdit] = useState(false)
  const [alerts, setAlerts] = useState([])

  const handleOpen = (alert) => {
    if (alert) {
      setForm(alert)
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
      setAlerts((prev) =>
        prev.map((a) => (a.alertId === form.alertId ? form : a))
      )
    } else {
      setAlerts((prev) => [...prev, { ...form, alertId: Date.now().toString() }])
    }
    setOpen(false)
  }

  const handleDelete = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.alertId !== alertId))
  }

  return (
    <div>
      <h2>Alerts & Photo Logs</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)} sx={{ mb: 2 }} disableElevation>
        Add Alert
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
        <Table aria-label="alerts photo logs table" className={styles['table-responsive']}>
          <TableHead>
            <TableRow>
              <TableCell>Alert ID</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Alert Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <TableRow key={alert.alertId}>
                  <TableCell data-label="Alert ID">{alert.alertId}</TableCell>
                  <TableCell data-label="Device">{alert.device}</TableCell>
                  <TableCell data-label="Date">{alert.date}</TableCell>
                  <TableCell data-label="Alert Type">{alert.alertType}</TableCell>
                  <TableCell data-label="Description">{alert.description}</TableCell>
                  <TableCell data-label="Photo">{alert.photo ? alert.photo.name : ''}</TableCell>
                  <TableCell data-label="Actions">
                    <Button size="small" onClick={() => handleOpen(alert)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(alert.alertId)}>Delete</Button>
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
        <DialogTitle>{isEdit ? 'Edit Alert' : 'Add Alert'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Device"
            name="device"
            value={form.device}
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
            label="Alert Type"
            name="alertType"
            value={form.alertType}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Photo
            <input type="file" hidden name="photo" onChange={handleChange} accept="image/*" />
          </Button>
          {form.photo && <Typography variant="body2" sx={{ mt: 1 }}>{form.photo.name}</Typography>}
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

export default AlertsPhotoLogs
