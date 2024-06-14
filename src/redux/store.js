import { configureStore } from '@reduxjs/toolkit'
import projectStepSlice from './projectStepSlice'
import projectFormSlice from './projectFormSlice'

export const reduxStore = configureStore({
  reducer: {
    projectStep: projectStepSlice,
    projectForm: projectFormSlice,
  }
})