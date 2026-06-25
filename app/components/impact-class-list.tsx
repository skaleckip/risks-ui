import React from "react";
import type { ImpactClassDto } from "~/models/system-versions";

export interface ImpactClassListProps {
  classes: ImpactClassDto[]
}

export function ImpactClassList({ classes }: ImpactClassListProps): React.ReactElement {
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