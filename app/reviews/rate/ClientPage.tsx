"use client"
import { useAppDispatch, useReduxFormData } from "@/app/hooks"
import ReviewForm from "@/components/ReviewForm"
import { setForm } from "@/redux/slices/formSlice"
import Link from "next/link"
import { useEffect } from "react"

export default function About(props: any) {
  const { name, date, error, start, end, firstName, lastName } = props.data
  const dispatchRedux = useAppDispatch()
  const formData = useReduxFormData()
  const newFormData = {
    ...formData,
    firstName: firstName,
    lastName: lastName,
  }

  useEffect(() => {
    dispatchRedux(setForm(newFormData))
    // eslint-disable-next-line
  }, [])

  let href = "#"
  if (typeof window !== "undefined") {
    href = window.location.pathname + props.uri
  }

  return (
    <div className="flex flex-col items-center">
      <ReviewForm {...{ name, date, error, start, end, firstName, lastName }} />
    </div>
  )
}
