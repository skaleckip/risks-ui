import React from "react";
import { useKeycloak } from "@react-keycloak/web";

export default function Protected(): React.ReactElement {
  const { keycloak, initialized } = useKeycloak()

  if (!keycloak.authenticated) {
    keycloak.login()
    return (<button className="btn btn-secondary">I should be protected!</button>)
  }

  return (
    <button className="btn btn-secondary">I am protected!</button>
  )
}