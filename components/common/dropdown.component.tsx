import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

type Props = {
  onDeliveredSubmit: () => void
  onInitializeSubmit: () => void
}

export const Dropdown = ({ onDeliveredSubmit, onInitializeSubmit }: Props) => {
  const [status, setStatus] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  return (
    <Box sx={{ width: 'fit-content', minWidth: '160px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Actions</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={10} onClick={onInitializeSubmit}>
            In Transit
          </MenuItem>
          <MenuItem value={20} onClick={onDeliveredSubmit}>
            Delivered
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
