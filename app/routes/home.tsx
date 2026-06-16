import type { Route } from "./+types/home";
import { useKeycloak } from "@react-keycloak/web";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { keycloak } = useKeycloak()

  if (!keycloak.authenticated) {
    return (<button className="btn btn-primary" onClick={() => keycloak.login()}>Login</button>)
  } else {
    return (<button className="btn btn-secondary" onClick={() => keycloak.logout()}>Logout</button>)
  }
}
