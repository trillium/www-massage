import React from "react"

import ClientPage from "./ClientPage"

export default async function Page({
  searchParams,
}: {
  searchParams: { url: string }
}) {
  const { url } = searchParams
  return <ClientPage url={url} />
}
