import { createStore } from 'easy-peasy'
import FoodData from '../models/food'
/* eslint-disable no-undef*/

describe('Foods Actions', () => {
  test('adding a food', () => {
    const food = { id: 30, name: 'orange', price: 31, purchased: false }
    const store = createStore(FoodData)

    store.getActions().add(food)

    expect(store.getState().foods).toEqual([food]) //this is supposed to fail because the initial state doesn't match
  })

  test('setting a new state of food', () => {
    const foods = [
      { id: 23, name: 'Onion', price: 8, purchased: false },
      { id: 23, name: 'Watermelon', price: 8, purchased: false },
    ]
    const store = createStore(FoodData)

    store.getActions().setFood(foods)

    expect(store.getState().foods).toEqual(foods)
  })

  test('switching purchased attribute', () => {
    const id = '21'
    const store = createStore(FoodData)

    store.getActions().toggle(id)

    expect(store.getState().foods[0].purchased).toBeTruthy
  })
})

export { }
