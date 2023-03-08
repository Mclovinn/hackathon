import { persist } from 'easy-peasy'
import { SessionModel, sessionsModel } from './session.model'

export interface Model {
  sessionModel: SessionModel
}

export const model: Model = {
  sessionModel: persist(sessionsModel),
}
