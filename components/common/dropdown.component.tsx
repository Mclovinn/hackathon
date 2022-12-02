import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { initializeOrders, setOrderAsDelivered } from '../../services/frontend-services/orders'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { TableRowType } from '../sections/orders'

type Props = {
  selectedOrders: TableRowType[]
}

export const Dropdown = ({ selectedOrders }: Props) => {
  const [status, setStatus] = useState('')
  const setOrderAsDeliveredMutation = useMutation(setOrderAsDelivered, {
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context)
    },
  })
  const initializeOrdersMutation = useMutation(initializeOrders, {
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context)
    },
  })

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  const selectedIds = selectedOrders.map(order => order.id)

  const handleUpdateAction = async () => {
    //TODO: Manage states (loading, error, success)

    try {
      const response = await initializeOrdersMutation.mutate(selectedIds)
      console.log(response)

      // showGlobalSuccess({ message: 'Status successfully updated.' });
    } catch (e) {
      console.error(e)
      // showGlobalError({
      //   message: 'There was a problem trying to change status',
      // });
    }
  }

  const setOrderAsDeliveredAction = async () => {
    for (let id of selectedIds) {
      await setOrderAsDeliveredMutation.mutate(id)
    }
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
          <MenuItem value={10} onClick={handleUpdateAction}>
            In Transit
          </MenuItem>
          <MenuItem value={20} onClick={setOrderAsDeliveredAction}>
            Delivered
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
