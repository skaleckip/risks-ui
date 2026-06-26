import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import React from "react";
import { AuthProvider, type AuthProviderProps, useAuth } from "react-oidc-context";
import axios from "axios";
import { configure } from "axios-hooks";

// noinspection JSUnusedGlobalSymbols
export function Layout({ children }: { children: React.ReactNode }) {
  // noinspection HtmlRequiredTitleElement
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  let authority = import.meta.env.APP_AUTHORITY ?? 'http://localhost:9090/realms/norman';
  let clientId = import.meta.env.APP_CLIENT_ID ?? 'risks-ui';
  let protocolHostPort = import.meta.env.DEV ? 'http://localhost:5173' : 'http://localhost:3000';
  let redirectUri = import.meta.env.APP_REDIRECT_URI ?? (protocolHostPort + import.meta.env.BASE_URL);

  const oidcConfig: AuthProviderProps = {
    authority: authority,
    redirect_uri: redirectUri,
    post_logout_redirect_uri: redirectUri,
    client_id: clientId,
  }

  return (
    <AuthProvider{...oidcConfig}>
      <WithAxios>
        <Outlet />
      </WithAxios>
    </AuthProvider>
  );
}

// Must be called within AuthProvider, because it uses useAuth().
// Otherwise, react will throw an exception and crash.
function WithAxios({ children }: { children: React.ReactNode }): React.ReactElement {
  const auth = useAuth();
  const baseURL = encodeURI(import.meta.env.API_BASE_URL ?? "http://localhost:8080/api")
  const axiosInstance = axios.create({ baseURL })

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.authorization =
        !auth.isLoading && auth.isAuthenticated
          ? `Bearer ${auth.user?.access_token ?? ''}`
          : undefined
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  configure({ axios: axiosInstance })

  return (<>{children}</>)
}

// noinspection JSUnusedGlobalSymbols
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
