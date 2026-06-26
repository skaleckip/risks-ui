import React from "react";
import type { SystemVersionDto } from "~/models/system-versions";
import { useNavigate } from "react-router";

export interface SystemVersionListProps {
  systemVersions: SystemVersionDto[]
}

export function SystemVersionList({ systemVersions }: SystemVersionListProps): React.ReactElement {
  const navigate = useNavigate();

  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Customer</th>
          <th>System class</th>
          <th>Valid from</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {systemVersions.map(systemVersion => (
          <tr key={systemVersion.id}>
            <td>{systemVersion.customerName}</td>
            <td>{systemVersion.systemClass}</td>
            <td>{systemVersion.validFrom}</td>
            <td className="flex flex-row gap-2">
              <button
                onClick={() => navigate("/risks-criteria/" + systemVersion.id)}
                className="btn btn-primary">
                Criteria
              </button>
              <button
                onClick={() => navigate("/risks-ident/" + systemVersion.id)}
                className="btn btn-primary">
                Identify risks
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}