import React, { useEffect, useState } from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useAxios } from "~/utils/hooks";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - Risks" },
    { name: "description", content: "Risk management" },
  ];
}

// noinspection JSUnusedGlobalSymbols
export default function Risks(): React.ReactElement {
  const [risks, setRisks] = useState<any[]>([])
  const axiosInstance = useAxios("http://localhost:8080/api")

  useEffect(() => {
    if (axiosInstance != null && axiosInstance.current != null) {
      axiosInstance.current.get("/risks").then((response) => {
        if (response.status === 200) {
          setRisks(response.data as any[]);
        }
      });
    }

    return () => {
      setRisks([])
    }
  }, [axiosInstance])

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
        {risks.map(risk => (
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