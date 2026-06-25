import React from "react";
import type { ProbabilityClassDto } from "~/models/system-versions";

export interface ProbabilityClassListProps {
  classes: ProbabilityClassDto[]
}

export function ProbabilityClassList({ classes }: ProbabilityClassListProps): React.ReactElement {
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
        {classes.map(clazz => (
          <tr key={clazz.id}>
            <td>{clazz.code}</td>
            <td>{clazz.name}</td>
            <td>{clazz.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}