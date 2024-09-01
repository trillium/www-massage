import { paymentMethod } from "@/data/paymentMethods"
import { z } from "zod"

const paymentMethodValues = paymentMethod.map((method) => method.value) as [
  string,
  ...string[]
]

const PaymentMethodType = z.enum(paymentMethodValues)

export const AppointmentRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  start: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Start must be a valid date.",
  }),
  end: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "End must be a valid date.",
  }),
  timeZone: z.string(),
  location: z.string(),
  duration: z
    .string()
    .refine((value) => !Number.isNaN(Number.parseInt(value)), {
      message: "Duration must be a valid integer.",
    }),
  price: z.string().refine((value) => !Number.isNaN(Number.parseInt(value)), {
    message: "Price must be a valid integer.",
  }),
  paymentMethod: z.enum(paymentMethodValues),
})