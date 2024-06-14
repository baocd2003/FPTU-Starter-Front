import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activeStep: 0,
}

const projectStepSlice = createSlice({
  name: 'projectStep',
  initialState,
  reducers: {
    // nextStep: (state) => {
    //   state.activeStep += 1;
    // },
    // prevStep: (state) => {
    //   state.activeStep -= 1;
    // },
    setStepOne: (state) => {
      state.activeStep = 0
    },
    setStepTwo: (state) => {
      state.activeStep = 1
    },
    setStepThree: (state) => {
      state.activeStep = 2
    },
    setStepFour: (state) => {
      state.activeStep = 3
    },
    setStepFive: (state) => {
      state.activeStep = 4
    }
  },

})

export const { setStepOne, setStepTwo, setStepThree, setStepFour, setStepFive } = projectStepSlice.actions

export default projectStepSlice.reducer