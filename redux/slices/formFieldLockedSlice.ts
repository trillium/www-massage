import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/redux/store"
import type { BookingFormData } from "@/components/booking/BookingForm"
import type { ReviewFormData } from "@/components/ReviewForm"
import { ReviewSnippetProps } from "@/components/ReviewCard"

export const initialBookingFormData: { [K in keyof BookingFormData]: boolean } = {
  /** First name of the requester */
  firstName: false,
  /** Last name of the requester */
  lastName: false,
  /** Email address of the requester */
  email: false,
  /** Address of the requester */
  location: false,
  /** Phone number of the requester */
  phone: false,
  /** Payment method of the requester */
  paymentMethod: false,
}

export const initialReviewFormState: { [K in keyof FormStateType]: boolean } = {
  /** Name of the requester */
  name: false,
  /** Fast name of the requester */
  firstName: false,
  /** Last name of the requester */
  lastName: false,
  /** Short review description */
  text: false,
  /** Datetime start */
  start: false,
  /** Datetime end */
  end: false,
  /** Ratings */
  rating: false,
}

export const initialReviewSnippetProps: { [K in keyof ReviewSnippetProps]: boolean } = {
  name: false,
  text: false,
  date: false,
  rating: false,
}

type FormStateType = BookingFormData & ReviewFormData & ReviewSnippetProps

type FormStateTypeBoolean = {
  [K in keyof FormStateType]: boolean
}

const initialState: FormStateTypeBoolean = {
  ...initialBookingFormData,
  ...initialReviewFormState,
}

export const formFieldLockedSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormFieldLocked: (state, action: PayloadAction<Partial<FormStateTypeBoolean>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setFormFieldLocked } = formFieldLockedSlice.actions

export const selectFormFieldLocked = (state: RootState) => state.form

export default formFieldLockedSlice.reducer
