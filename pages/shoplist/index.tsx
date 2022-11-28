import React from 'react'
import Foods from '../../components/ShopList/Foods'
import AddFood from '../../components/ShopList/AddFood'
import FoodData from '../../models/food'
import { StoreProvider, createStore } from 'easy-peasy'

const store = createStore(FoodData)

export default function ShopList() {
  return (
    <StoreProvider store={store}>
      <Foods />
      <AddFood />
    </StoreProvider>
  )
}
