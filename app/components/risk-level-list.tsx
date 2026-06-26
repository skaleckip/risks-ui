import React from "react";
import type { RiskLevelDto } from "~/api/system-versions";

export interface RiskLevelListProps {
  levels: RiskLevelDto[]
}

export function RiskLevelList({ levels }: RiskLevelListProps): React.ReactElement {
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Probability</th>
          <th>Impact</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {levels.map(level => (
          <tr key={level.id}>
            <td>{level.probabilityClass.code} ({level.probabilityClass.name})</td>
            <td>{level.impactClass.code} ({level.impactClass.name})</td>
            <td>{level.level}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}