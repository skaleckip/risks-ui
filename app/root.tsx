import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import React, { useLayoutEffect } from "react";
import { AuthProvider, type AuthProviderProps, useAuth } from "react-oidc-context";
import axios from "axios";
import { configure } from "axios-hooks";
import type { User } from "oidc-client-ts";

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

// noinspection SpellCheckingInspection
export default function App() {
  let authority = import.meta.env.APP_AUTHORITY ?? 'http://localhost:9090/realms/norman';
  let clientId = import.meta.env.APP_CLIENT_ID ?? 'risks-ui';
  let protocolHostPort = import.meta.env.DEV ? 'http://localhost:5173' : 'http://localhost:3000';
  let redirectUri = import.meta.env.APP_REDIRECT_URI ?? (protocolHostPort + import.meta.env.BASE_URL);

  // After the react-oidc-contex documentation:
  // "You must provide an implementation of onSigninCallback to oidcConfig
  // to remove the payload from the URL upon successful login.
  // Otherwise, if you refresh the page, and the payload is still there,
  // signinSilent - which handles renewing your token - won't work.
  // A working implementation is already in the code here."
  // And the provided link is:
  // https://github.com/authts/react-oidc-context/blob/f175dcba6ab09871b027d6a2f2224a17712b67c5/src/AuthProvider.tsx#L20-L30
  // noinspection SpellCheckingInspection
  const onSigninCallback = (_user: User | void): void => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }

  // noinspection SpellCheckingInspection
  const oidcConfig: AuthProviderProps = {
    authority: authority,
    redirect_uri: redirectUri,
    post_logout_redirect_uri: redirectUri,
    client_id: clientId,
    onSigninCallback
  }

  return (
    <AuthProvider {...oidcConfig}>
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

  // Regular useEffect would run after layout rendering.
  // Typical effects may initiate long-lasting operations
  // therefore, they are executed after render finishes.
  // Unfortunately, we need to reconfigure an Axios instance
  // BEFORE the layout renders. Why? Well, layout will SEND
  // (via axios) questions to the backend about pages available
  // to the user. That is why we need Axios to be reconfigured
  // earlier. To achieve this, we make use of the useLayoutEffect,
  // which executes straight away.
  useLayoutEffect(() => {
    const axiosInstance = axios.create({ baseURL })
    const reqInt = axiosInstance.interceptors.request.use(
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

    return () => {
      axiosInstance.interceptors.request.eject(reqInt)
    }
  }, [auth.isAuthenticated, auth.user])

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
