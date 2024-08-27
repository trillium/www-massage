import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/redux/store"
import type { BookingFormData } from "@/components/booking/BookingForm"

export const initialBookingFormData = {
  /** First name of the requester */
  firstName: "",
  /** Last name of the requester */
  lastName: "",
  /** Email address of the requester */
  email: "",
  /** Address of the requester */
  location: "",
  /** Phone number of the requester */
  phone: "",
  /** Payment method of the requester */
  paymentMethod: "cash",
}

type FormStateType = BookingFormData

type FormState = FormStateType

const initialState: FormState = {
  ...initialBookingFormData,
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<FormStateType>) => action.payload,
  },
})

export const { setForm } = formSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFormData = (state: RootState) => state.form

export default formSlice.reducer
