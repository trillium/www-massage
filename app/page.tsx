import type {
  InferGetServerSidePropsType,
} from "next"

import ClientPage from "@/app/ClientPage"
import { fetchData } from "@/lib/fetch/fetchData"
import { applyReferral } from "@/lib/posthog/applyReferral"

export type PageProps = InferGetServerSidePropsType<typeof fetchData>

export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: { searchParams: URLSearchParams }) {
  const { props } = await fetchData( { searchParams })
  applyReferral({ searchParams })
  return <ClientPage {...props} />
}