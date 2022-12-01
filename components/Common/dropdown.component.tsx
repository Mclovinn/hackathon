import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function Dropdown() {
  const [status, setStatus] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  return (
    <Box sx={{ width: 'fit-content', minWidth: '160px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Change Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={10}>In Transit</MenuItem>
          <MenuItem value={20}>Delivered</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
