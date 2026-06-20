// noinspection DuplicatedCode

import React from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useNormanAxios } from "~/hooks/norman-axios";
import type { RiskDto } from "~/models/risks";
import type { PageDto } from "~/models/shared";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - RisksIdent" },
    { name: "description", content: "Risk management" },
  ];
}

export default function Risks(): React.ReactElement {
  const url = encodeURI('/risks?pageNumber=0&pageSize=10&name=%');
  const [{ data, loading, error }] = useNormanAxios<PageDto<RiskDto>>(url);

  if (loading) {
    return (<p>Loading ...</p>)
  }

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Risk name</th>
          <th>Risk owner</th>
          <th>Probability</th>
          <th>Loss</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {data?.items.map(risk => (
          <tr>
            <td>{risk.name}</td>
            <td>Fireman</td>
            <td>Tiny</td>
            <td>Huge</td>
            <td>TH</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}