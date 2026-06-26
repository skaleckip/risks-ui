import React from "react";
import type { Route } from "./+types/system-versions";
import { SystemVersionList } from "~/components/system-version-list";
import useAxios from "axios-hooks";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - Systems" },
    { name: "description", content: "List of customer systems" },
  ];
}

export default function SystemVersions(): React.ReactElement {
  const url = encodeURI(`/system-versions`);
  const [{ data, loading, error }] = useAxios(url)
  if (loading) {
    return (<p>Loading ...</p>)
  }

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <SystemVersionList systemVersions={data ?? []} />
  )
}