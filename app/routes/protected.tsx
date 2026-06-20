import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Outlet } from "react-router";

export default function Protected(): React.ReactElement {
  const { initialized, keycloak } = useKeycloak();

  if (!initialized) {
    return <>Loading...</>
  }

  if (keycloak.authenticated) {
    return <Outlet />;
  } else {
    keycloak.login().then();
    return <></>;
  }
}