import React from 'react'
import { Actions, useStoreActions, useStoreState } from 'easy-peasy'
import FoodItem from './FoodItem'
import styled from 'styled-components'
import { FoodModel, IFood } from '../../types/food-model.type'

const InfoBox = styled.div`
  background: #edebe6;
  width: fit-content;
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  border-radius: 8px;
  margin-top: 50px;
  margin-bottom: 20px;
`
const FoodItemBox = styled.div`
  background: orange;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 20px 20px 40px 20px;
  border-bottom: none;
`
const TextBtn = styled.div`
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
  width: fit-content;
  margin: auto;
  border-radius: 8px;
`

const Todos = () => {
  const foods = useStoreState((state: FoodModel) => state.foods)
  const update = useStoreActions((actions: Actions<FoodModel>) => actions.updateThunk)
  return (
    <InfoBox>
      <h1>Food shopping´s list</h1>
      <p>Click an item to cross it out</p>
      <TextBtn onClick={() => update()}>Activate thunk</TextBtn>
      <hr />
      <FoodItemBox>
        {foods.map((food: IFood, index: Number) => (
          <FoodItem food={food} key={'food' + food.id + index} />
        ))}
      </FoodItemBox>
    </InfoBox>
  )
}

export default Todos
