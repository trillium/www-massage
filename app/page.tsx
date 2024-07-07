import type {
  InferGetServerSidePropsType,
} from "next"

import ClientPage from "@/app/ClientPage"
import { fetchData } from "@/lib/fetch/fetchData"

export type PageProps = InferGetServerSidePropsType<typeof fetchData>

export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: { searchParams: URLSearchParams }) {
  const { props } = await fetchData( { searchParams })
  return <ClientPage {...props} />
}