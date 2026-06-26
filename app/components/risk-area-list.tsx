import React from "react";
import type { RiskAreaDto } from "~/api/system-versions";

export interface RiskAreaListProps {
  areas: RiskAreaDto[]
}

export function RiskAreaList({ areas }: RiskAreaListProps): React.ReactElement {
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {areas.map(area => (
          <tr key={area.id}>
            <td>{area.code}</td>
            <td>{area.name}</td>
            <td>{area.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}