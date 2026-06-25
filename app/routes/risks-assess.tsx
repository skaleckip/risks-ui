// noinspection DuplicatedCode

import React from "react";
import type { Route } from "./+types/risks-assess";
import { useNormanAxios } from "~/hooks/norman-axios";
import type { RiskWideDto } from "~/models/risks";
import type { PageDto } from "~/models/shared";
import { RiskListAssess } from "~/components/risk-list-assess";
import { useKeycloak } from "@react-keycloak/web";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - Assess risks" },
    { name: "description", content: "List of risks to assess" },
  ];
}

export default function Risks({ params }: Route.ComponentProps): React.ReactElement {
  const url = encodeURI(`/risks-by-owner/${params.ownerUsername}?pageNumber=0&pageSize=10`);
  const [{ data, loading, error }] = useNormanAxios<PageDto<RiskWideDto>>(url);

  if (loading) {
    return (<p>Loading ...</p>)
  }

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <RiskListAssess risks={data?.items ?? []} />
  )
}