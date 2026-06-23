import type { RiskWideDto } from "~/models/risks";
import React from "react";

export interface RiskListProps {
  risks: RiskWideDto[]
}
export function RiskListForIdentification({risks}: RiskListProps ): React.ReactElement {
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Risk name</th>
          <th>Risk owner</th>
          <th>R/O Account</th>
        </tr>
      </thead>
      <tbody>
        {risks.map(risk => (
          <tr>
            <td>{risk.name}</td>
            <td>{risk.ownerName}</td>
            <td>{risk.ownerUsername}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}