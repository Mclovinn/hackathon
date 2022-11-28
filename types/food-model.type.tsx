import { Action, Thunk } from 'easy-peasy'

export interface IFood {
  id: Number
  name: String
  price: Number
  purchased: Boolean
}

export interface FoodModel {
  foods: IFood[]
  toggle: Action<FoodModel, string>
  add: Action<FoodModel, IFood>
  setFood: Action<FoodModel, IFood[]>
  updateThunk: Thunk<FoodModel>
}
