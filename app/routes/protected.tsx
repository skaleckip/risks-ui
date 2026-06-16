import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Outlet } from "react-router";

// noinspection JSUnusedGlobalSymbols
export default function Protected(): React.ReactElement {
  const { initialized, keycloak } = useKeycloak();

  if (!initialized) {
    // Here will be a loading indicator
    return <></>
  }

  if (keycloak.authenticated) {
    return <Outlet />;
  } else {
    keycloak.login().then();
    return <></>;
  }
}