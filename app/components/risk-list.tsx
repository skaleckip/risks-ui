import type { RiskWideDto } from "~/models/risks";
import React from "react";

export interface RiskListProps {
  risks: RiskWideDto[]
}
export function RiskList({risks}: RiskListProps ): React.ReactElement {
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Risk name</th>
          <th>Description</th>
          <th>Risk owner</th>
          <th>R/O Account</th>
          <th>Probability</th>
          <th>Loss</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {risks.map(risk => (
          <tr>
            <td>{risk.name}</td>
            <td>{risk.description}</td>
            <td>{risk.ownerName}</td>
            <td>{risk.ownerUsername}</td>
            <td>{risk.probabilityClass?.name ?? '-'}</td>
            <td>{risk.impactClassDto?.name ?? '-'}</td>
            <td>TH</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}