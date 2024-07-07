import { redirect } from "next/navigation"
import slugs from "./pricing"

import type { InferGetServerSidePropsType } from "next"

import ClientPage from "./ClientPage"
import { fetchData } from "@/lib/fetch/fetchData"

export const dynamic = "force-dynamic"

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: URLSearchParams
  params: { bookingPageId: string}
}) {
  // const { params } = props
  const { bookingPageId } = params
  const { pricing } = slugs[bookingPageId as keyof typeof slugs] ?? false

  if (!pricing) {
    return redirect("/")
  }

  const { props } = await fetchData({ searchParams })
  return (
    <>
      
      <ClientPage {...props} pricing={pricing} />
    </>
  )
}
