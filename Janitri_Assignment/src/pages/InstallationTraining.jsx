import React, { useState } from 'react'
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const InstallationTraining = () => {
  const [form, setForm] = useState({
    installationDate: '',
    engineerName: '',
    checklistCompleted: false,
    trainingCompleted: false,
    feedback: '',
    photo: null,
  })

  const [records, setRecords] = useState([])

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.installationDate) newErrors.installationDate = 'Installation date is required'
    if (!form.engineerName) newErrors.engineerName = 'Engineer name is required'
    if (!form.checklistCompleted) newErrors.checklistCompleted = 'Checklist must be completed'
    if (!form.trainingCompleted) newErrors.trainingCompleted = 'Training must be completed'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Add new record
    setRecords((prev) => [...prev, { ...form, id: Date.now().toString() }])
    // Reset form
    setForm({
      installationDate: '',
      engineerName: '',
      checklistCompleted: false,
      trainingCompleted: false,
      feedback: '',
      photo: null,
    })
    setErrors({})
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Installation & Training Records
      </Typography>

      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table aria-label="installation training table">
          <TableHead>
            <TableRow>
              <TableCell>Installation Date</TableCell>
              <TableCell>Engineer Name</TableCell>
              <TableCell>Checklist Completed</TableCell>
              <TableCell>Training Completed</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.installationDate}</TableCell>
                  <TableCell>{record.engineerName}</TableCell>
                  <TableCell>{record.checklistCompleted ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{record.trainingCompleted ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{record.feedback}</TableCell>
                  <TableCell>{record.photo ? record.photo.name : ''}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Installation & Training Form
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Installation Date"
          name="installationDate"
          type="date"
          value={form.installationDate}
          onChange={handleChange}
          error={!!errors.installationDate}
          helperText={errors.installationDate}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          label="Engineer Name"
          name="engineerName"
          value={form.engineerName}
          onChange={handleChange}
          error={!!errors.engineerName}
          helperText={errors.engineerName}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={form.checklistCompleted}
              onChange={handleChange}
              name="checklistCompleted"
            />
          }
          label="Checklist Completed"
        />
        {errors.checklistCompleted && (
          <Typography color="error" variant="body2">
            {errors.checklistCompleted}
          </Typography>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={form.trainingCompleted}
              onChange={handleChange}
              name="trainingCompleted"
            />
          }
          label="Training Completed"
        />
        {errors.trainingCompleted && (
          <Typography color="error" variant="body2">
            {errors.trainingCompleted}
          </Typography>
        )}
        <TextField
          label="Feedback"
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Unboxing Photo
          <input type="file" hidden name="photo" onChange={handleChange} accept="image/*" />
        </Button>
        {form.photo && <Typography variant="body2" sx={{ mt: 1 }}>{form.photo.name}</Typography>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Paper>
  )
}

export default InstallationTraining
