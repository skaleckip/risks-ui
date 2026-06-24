// noinspection DuplicatedCode

import React from "react";
import type { Route } from "./+types/risks-ident";
import { useNormanAxios } from "~/hooks/norman-axios";
import type { RiskWideDto } from "~/models/risks";
import type { PageDto } from "~/models/shared";
import { RiskListForIdentification } from "~/components/risk-list-ident";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - Identify risks" },
    { name: "description", content: "Lists of identified risks" },
  ];
}

export default function RisksIdent({ params }: Route.ComponentProps): React.ReactElement {
  const url = encodeURI(`/system-versions/${params.systemVersionId}/risks?pageNumber=0&pageSize=10`);
  const [{ data, loading, error }] = useNormanAxios<PageDto<RiskWideDto>>(url);

  if (loading) {
    return (<p>Loading ...</p>)
  }

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <RiskListForIdentification risks={data?.items ?? []} />
  )
}