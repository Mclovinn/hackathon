import { Action, action, thunk, Thunk } from 'easy-peasy'
import UserService from '../../services/user.service'
import { UserType } from '../../types/user.type'

export type TokenType = {
  accessToken: string
  idToken: string
  refreshToken: string
}

interface Session {
  cognitoId?: string
  tokens?: TokenType
  email?: string
  name?: string
  isAuthenticated?: boolean
  isAuthLoaded?: boolean
  responseStatus?: { statusCode: any; errorMessage: string }
  role?: string
}

interface SessionState {
  session: Session
}

interface Status {
  statusCode: any
  errorMessage: any
}
export interface SessionActions {
  setSession: Action<this, Session>
  clearSession: Action<this>
  setError: Action<this, Status>
  clearError: Action<this>
}

export interface SessionThunks {
  setSessionThunk: Thunk<this>
  clearSessionThunk: Thunk<this>
  clearErrorThunk: Thunk<this>
}

export interface SessionModel extends SessionState, SessionActions, SessionThunks {}

export const sessionsModel: SessionModel = {
  session: {
    cognitoId: '',
    tokens: { accessToken: '', idToken: '', refreshToken: '' },
    email: '',
    name: '',
    isAuthenticated: false,
    isAuthLoaded: false,
    responseStatus: { statusCode: null, errorMessage: '' },
    role: '',
  },

  setSession: action((state, payload) => {
    state.session = { ...state.session, ...payload }
  }),

  clearSession: action(state => {
    state.session = {
      cognitoId: '',
      tokens: { accessToken: '', idToken: '', refreshToken: '' },
      email: '',
      name: '',
      isAuthenticated: false,
      isAuthLoaded: true,
      responseStatus: { statusCode: null, errorMessage: '' },
      role: '',
    }
  }),

  setError: action((state, payload) => {
    state.session = { ...state.session, responseStatus: payload }
  }),

  clearError: action(state => {
    state.session = { ...state.session, responseStatus: { statusCode: null, errorMessage: '' } }
  }),

  clearErrorThunk: thunk(async actions => {
    actions.clearError()
  }),

  setSessionThunk: thunk(async (actions, payload) => {
    // actions.clearSession()

    // actions.setSession({
    //   isAuthLoaded: false,
    //   responseStatus: { statusCode: null, errorMessage: '' },
    // })

    if (payload) {
      if ('tokens' && 'cognitoId' in payload) {
        const { tokens, cognitoId } = payload
        const data = await UserService.getUserWithParameter('idCognito', cognitoId)
        const user: UserType = data[0]

        user &&
          user.idCognito !== '' &&
          actions.setSession({
            cognitoId: user.idCognito,
            tokens: tokens,
            email: user.email,
            name: user.firstName,
            role: user.role,
            isAuthenticated: true,
          })
      }
    }
  }),

  clearSessionThunk: thunk(async actions => {
    actions.clearSession()
  }),
}
