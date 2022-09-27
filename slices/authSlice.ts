import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthState {
  email: string,
  token:string|null
}

const initialState: AuthState = {
  email: '',
  token:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{email:string, token:string}>) => {
      console.log(action.payload.email, action.payload.token);
      state.email = action.payload.email,
      state.token =action.payload.token
      localStorage.setItem('token', action.payload.token);
    },
   
    logout:(state)=>{
      state.email ='',
      state.token =null 
      localStorage.removeItem('token')   
    }

  },
})

// Action creators are generated for each case reducer function
export const {  login , logout} = authSlice.actions

export const emailValue=(state: RootState) =>state.auth.email

export const tokenValue=(state: RootState) =>state.auth.token

export default authSlice.reducer