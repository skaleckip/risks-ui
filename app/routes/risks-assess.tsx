// noinspection DuplicatedCode

import React from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useNormanAxios } from "~/hooks/norman-axios";
import type { RiskWideDto } from "~/models/risks";
import type { PageDto } from "~/models/shared";
import { RiskList } from "~/components/risk-list";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - RisksIdent" },
    { name: "description", content: "Risk management" },
  ];
}

export default function Risks(): React.ReactElement {
  const knownSystemVersion = 'edbb7444-14e1-4da2-ad77-255099326e51'
  const url = encodeURI(`/system-versions/${knownSystemVersion}/risks?pageNumber=0&pageSize=10`);
  const [{ data, loading, error }] = useNormanAxios<PageDto<RiskWideDto>>(url);

  if (loading) {
    return (<p>Loading ...</p>)
  }

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <RiskList risks={data?.items ?? []} />
  )
}