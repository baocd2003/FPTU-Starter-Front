import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectForm: {
    stepOneData: {},
    stepTwoData: {},
    StepThreeData: {},
    StepFourData: {},
    StepFiveData: {}
  }
}

const projectFormSlice = createSlice({
  name: 'projectForm',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { step, data } = action.payload;
      state.projectForm[step] = data
    }
  }
})

export const { setFormData } = projectFormSlice.actions

export default projectFormSlice.reducer