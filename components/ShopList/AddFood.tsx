import React, { useState } from 'react'
import { useStoreActions, Actions } from 'easy-peasy'
import { FoodModel } from '../../types/food-model.type'
import styled from 'styled-components'

const AddBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: auto;
`

const AddTodo = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const add = useStoreActions((actions: Actions<FoodModel>) => actions.add)

  return (
    <AddBox>
      <form
        onSubmit={e => {
          e.preventDefault()
          add({ id: Math.floor(Math.random() * 20), name: name, price: price, purchased: false })
        }}
      >
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Add food to the list..." />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="Set the price"
        />
        <input type="submit" value="Add" />
      </form>
    </AddBox>
  )
}

export default AddTodo
