import type { Route } from "./+types/home";
import { useKeycloak } from "@react-keycloak/web";
import { NavLink } from "react-router";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman" },
    { name: "description", content: "Your ISO guy!" },
  ];
}

export default function Home() {
  const { initialized, keycloak } = useKeycloak()

  if (!initialized) {
    return (<div>Loading...</div>);
  }

  if (!keycloak.authenticated) {
    return (
      <div className="p-4 flex flex-col items-center gap-4">
        <button
          className="btn btn-primary"
          onClick={() => keycloak.login()}
        >
          Login
        </button>
      </div>
    )
  } else {
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
          onClick={() => keycloak.logout()}>
          Logout
        </button>
      </div>
    )
  }
}
