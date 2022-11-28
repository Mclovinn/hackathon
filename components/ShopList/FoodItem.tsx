import { useStoreActions, Actions } from 'easy-peasy'
import { FoodModel } from '../../types/food-model.type'
import React from 'react'
import styled from 'styled-components'

const FoodRow = styled.div`
  background: white;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  width: 100%;
  height: 40px;
  align-items: center;
  padding: 0px 20px 0px 20px;
  color: black;
  cursor: pointer;
  margin-bottom: 10px;
`

const FoodItem = ({ food }: any) => {
  const toogle = useStoreActions((actions: Actions<FoodModel>) => actions.toggle)
  return (
    <FoodRow onClick={() => toogle(food.id)} style={{ textDecoration: food.purchased ? 'line-through' : 'none' }}>
      <span>{food.name}</span>
      <span>${food.price}</span>
    </FoodRow>
  )
}

export default FoodItem
