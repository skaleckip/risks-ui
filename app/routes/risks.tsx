import React from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useApiGetRisks } from "~/hooks/api-risks";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - Risks" },
    { name: "description", content: "Risk management" },
  ];
}

// noinspection JSUnusedGlobalSymbols
export default function Risks(): React.ReactElement {

  const { risksPage, loading, error } = useApiGetRisks()

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
          <th>Accepted</th>
          <th>Treatment Priority</th>
        </tr>
      </thead>
      <tbody>
        {risksPage.items.map(risk => (
          <tr>
            <td>{risk.name}</td>
            <td>Fireman</td>
            <td>Tiny</td>
            <td>Huge</td>
            <td>TH</td>
            <td>No</td>
            <td>Urgent</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}