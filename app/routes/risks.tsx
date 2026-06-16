import React from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/home";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - Risks" },
    { name: "description", content: "Risk management" },
  ];
}

// noinspection JSUnusedGlobalSymbols
export default function Risks(): React.ReactElement {
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
        <tr>
          <td>Store fire</td>
          <td>Fireman</td>
          <td>Tiny</td>
          <td>Huge</td>
          <td>TH</td>
          <td>No</td>
          <td>Urgent</td>
        </tr>
        <tr>
          <td>Store key loss</td>
          <td>Doorman</td>
          <td>Low</td>
          <td>Moderate</td>
          <td>SM</td>
          <td>Yes</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Head loss</td>
          <td>Manager</td>
          <td>Significant</td>
          <td>Huge</td>
          <td>SH</td>
          <td>No</td>
          <td>Urgent</td>
        </tr>
      </tbody>
    </table>
  )
}