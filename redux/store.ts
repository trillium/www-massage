import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { formSlice } from "@/redux/slices/formSlice"
import { availabilitySlice } from "@/redux/slices/availabilitySlice"
import { modalSlice } from "@/redux/slices/modalSlice"
import { readySlice } from "./slices/readySlice"
import { formFieldLockedSlice } from "./slices/formFieldLockedSlice"

const rootReducer = combineSlices(
  formSlice,
  availabilitySlice,
  modalSlice,
  readySlice,
  formFieldLockedSlice
)

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
