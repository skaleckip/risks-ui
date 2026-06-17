import React from "react";
import { NavLink, Outlet } from "react-router";
import { useKeycloak } from "@react-keycloak/web";

// noinspection JSUnusedGlobalSymbols
export default function PrivateLayout(): React.ReactElement {
  const { initialized, keycloak } = useKeycloak()

  if (!initialized) {
    return (<div>Loading...</div>);
  }

  if (!keycloak.authenticated) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <button
          className="btn btn-primary"
          onClick={() => keycloak.login()}
        >
          Login
        </button>
        <div>
          <Outlet />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col items-center gap-2">
      <NavLink
        className="link link-primary"
        to="/risks"
      >
        Risks
      </NavLink>
      <button
        className="btn btn-secondary"
        // Todo, is there a better way to navigate home after logout?
        onClick={() => keycloak.logout({
          redirectUri: window.location.origin,
        })}>
        Logout
      </button>
      <Outlet />
    </div>
  )
}