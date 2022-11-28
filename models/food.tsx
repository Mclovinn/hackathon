import { action, thunk } from 'easy-peasy'
import { FoodModel, IFood } from '../types/food-model.type'

const FoodData: FoodModel = {
  foods: [
    { id: 21, name: 'Broccoli', price: 2, purchased: false },
    { id: 22, name: 'Carrots', price: 4, purchased: true },
    { id: 23, name: 'Apple', price: 8, purchased: false },
  ],
  //Actions
  toggle: action((state, id) => {
    state.foods.map((food: IFood) => {
      if (food.id === Number(id)) {
        food.purchased = !food.purchased
      }
      return food
    })
  }),
  add: action((state, food) => {
    state.foods = [...state.foods, food]
  }),
  setFood: action((state, comida: IFood[]) => {
    state.foods = comida
  }),

  //Thunks
  updateThunk: thunk(async action => {
    const foods = [
      { id: 21, name: 'Broccoli', price: 2, purchased: false },
      { id: 22, name: 'Carrots', price: 4, purchased: true },
      { id: 23, name: 'Apple', price: 8, purchased: false },
      { id: 23, name: 'Onion', price: 8, purchased: false },
      { id: 23, name: 'Watermelon', price: 8, purchased: false },
    ]

    const response: IFood[] = await new Promise(resolve =>
      setTimeout(() => {
        resolve(foods)
      }, 300)
    )

    action.setFood(response)
  }),
}

export default FoodData
