import React from "react";
import type { SystemVersionDto } from "~/models/system-versions";
import { useNavigate } from "react-router";
import { useKeycloak } from "@react-keycloak/web";

export interface SystemVersionListProps {
  systemVersions: SystemVersionDto[]
}

export function SystemVersionList({ systemVersions }: SystemVersionListProps): React.ReactElement {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

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
          <tr>
            <td>{systemVersion.customerName}</td>
            <td>{systemVersion.systemClass}</td>
            <td>{systemVersion.validFrom}</td>
            <td>
              {keycloak.hasRealmRole("auditor") ? (
                <button
                  onClick={() => navigate("/risk-ident")}
                  className="btn btn-primary">
                  Identify risks
                </button>
              ) : <></>
              }
              <button
                onClick={() => navigate("/risk-assess")}
                className="btn btn-primary">
                Assess risks
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}