import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/redux/store"
import type { BookingFormData } from "@/components/booking/BookingForm"
import type { ReviewFormData } from "@/components/ReviewForm"
import { ReviewSnippetProps } from "@/components/ReviewCard"

export const initialBookingFormData: BookingFormData = {
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
  paymentMethod: "",
}

export const initialReviewFormState: FormStateType = {
  /** Name of the requester */
  name: "",
  /** Fast name of the requester */
  firstName: "",
  /** Last name of the requester */
  lastName: "",
  /** Short review description */
  text: "",
  /** Datetime start */
  start: "",
  /** Datetime end */
  end: "",
  /** Ratings */
  rating: "",
}

export const initialReviewSnippetProps: ReviewSnippetProps = {
  name: "",
  text: "",
  date: "",
  rating: "",
}

type FormStateType = BookingFormData & ReviewFormData & ReviewSnippetProps

const initialState: FormStateType = {
  ...initialBookingFormData,
  ...initialReviewFormState,
}

export const formFieldLockedSlice = createSlice({
  name: "formFieldLocked",
  initialState,
  reducers: {
    setFormFieldLocked: (
      state,
      action: PayloadAction<Partial<FormStateType>>
    ) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setFormFieldLocked } = formFieldLockedSlice.actions

export const selectFormFieldLocked = (state: RootState) => state.formFieldLocked

export default formFieldLockedSlice.reducer
