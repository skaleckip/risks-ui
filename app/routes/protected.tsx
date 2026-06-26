import React from "react";
import { Outlet } from "react-router";
import { useAuth } from "react-oidc-context";

export default function Protected(): React.ReactElement {
  const auth = useAuth();

  if (auth.isLoading) {
    return <>Loading...</>
  }

  if (auth.isAuthenticated) {
    return <Outlet />;
  } else {
    auth.signinRedirect().then();
    return <></>;
  }
}