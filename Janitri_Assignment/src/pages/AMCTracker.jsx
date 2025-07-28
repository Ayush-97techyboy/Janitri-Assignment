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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import styles from '../styles/TableStyles.module.scss'

const initialFormState = {
  contractId: '',
  customer: '',
  startDate: '',
  endDate: '',
  status: '',
  notes: '',
}

const AMCTracker = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialFormState)
  const [isEdit, setIsEdit] = useState(false)
  const [contracts, setContracts] = useState([])

  const handleOpen = (contract) => {
    if (contract) {
      setForm(contract)
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
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (isEdit) {
      setContracts((prev) =>
        prev.map((c) => (c.contractId === form.contractId ? form : c))
      )
    } else {
      setContracts((prev) => [...prev, { ...form, contractId: Date.now().toString() }])
    }
    setOpen(false)
  }

  const handleDelete = (contractId) => {
    setContracts((prev) => prev.filter((c) => c.contractId !== contractId))
  }

  return (
    <div>
      <h2>AMC/CMC Tracker</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)} sx={{ mb: 2 }} disableElevation>
        Add Contract
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
        <Table aria-label="amc tracker table" className={styles['table-responsive']}>
          <TableHead>
            <TableRow>
              <TableCell>Contract ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <TableRow key={contract.contractId}>
                  <TableCell data-label="Contract ID">{contract.contractId}</TableCell>
                  <TableCell data-label="Customer">{contract.customer}</TableCell>
                  <TableCell data-label="Start Date">{contract.startDate}</TableCell>
                  <TableCell data-label="End Date">{contract.endDate}</TableCell>
                  <TableCell data-label="Status">{contract.status}</TableCell>
                  <TableCell data-label="Notes">{contract.notes}</TableCell>
                  <TableCell data-label="Actions">
                    <Button size="small" onClick={() => handleOpen(contract)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(contract.contractId)}>Delete</Button>
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
        <DialogTitle>{isEdit ? 'Edit Contract' : 'Add Contract'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Customer"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Date"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={form.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
          />
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

export default AMCTracker
