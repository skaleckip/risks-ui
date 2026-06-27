import React, { type SVGProps } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import useAxios from "axios-hooks";
import type { User } from "oidc-client-ts";
import type { UiDto } from "~/api/ui";

export default function Layout(): React.ReactElement {
  const auth = useAuth()
  // noinspection SpellCheckingInspection
  switch (auth.activeNavigator) {
    case "signinSilent":
      return (<div>Signing you in ...</div>)
    case "signoutRedirect":
      return (<div>Signing you out ...</div>)
  }

  if (auth.isLoading) {
    return (<div>Loading ...</div>)
  }

  if (auth.error) {
    console.log(`${auth.error.source} caused ${auth.error.message}`)
    return (<div>Authorization error, check console.</div>)
  }

  return auth.isAuthenticated
    ? <PrivateLayout />
    : <PublicLayout />
}

function PublicLayout() {
  const auth = useAuth()

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <div className="navbar bg-base-100 gap-2">
        <div className="flex-none">
          <ChessKingIcon />
        </div>

        <div className="flex-1">
          <span>Norman</span>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-primary btn-ghost"
            onClick={() => auth.signinRedirect()}>
            Login
          </button>
        </div>
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

function PrivateLayout() {
  const auth = useAuth()
  const navigate = useNavigate()

  // We will ask backand if are allowed to show some options
  // Todo, if the call fails, we should show an error somewhere!
  const url = encodeURI(`/ui/system-versions`);
  const [{ data, loading, error }] = useAxios<UiDto>(url)

  const capitals = userCapitals(auth.user)
  const userName = auth.user?.profile?.preferred_username ?? ''

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-base-300 flex flex-row gap-2">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <SidebarOpenIcon />
          </label>
          <div className="flex-none">
            <ChessKingIcon />
          </div>
          <span className="flex-1">
            Norman
          </span>
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span>{capitals}</span>
            </div>
          </div>
          <div>
            <button
              className="btn btn-ghost btn-primary"
              onClick={() => auth.signoutRedirect()}>
              Logout
            </button>
          </div>
        </nav>
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Home"
                      onClick={() => navigate("/")}>
                <HomeIcon />
                <span className="is-drawer-close:hidden">Home</span>
              </button>
            </li>

            {(!loading && !error && data?.showSystemVersions) &&
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Normative systems"
                        onClick={() => navigate("/system-versions")}>
                  <PinIcon />
                  <span className="is-drawer-close:hidden">Normative systems</span>
                </button>
              </li>
            }

            {userName &&
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Assess risks"
                        onClick={() => navigate("/risks-assess/" + userName)}>
                  <RisksIcon />
                  <span className="is-drawer-close:hidden">Assess risks</span>
                </button>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export function userCapitals(user: User | null | undefined): string {
  if (user == null || user.profile == null) return '??'
  const firstName: string = user.profile?.given_name ?? '?'
  const firstCapital = firstName.charAt(0).toUpperCase()
  const lastName: string = user.profile?.family_name ?? '?'
  const lastCapital = lastName.charAt(0).toUpperCase()
  return `${firstCapital}${lastCapital}`
}

function SidebarOpenIcon({ ...restProps }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         strokeLinejoin="round" strokeLinecap="round"
         strokeWidth="2" fill="none" stroke="currentColor"
         className="my-1.5 inline-block size-5" {...restProps}>
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
      <path d="M9 4v16"></path>
      <path d="M14 10l2 2l-2 2"></path>
    </svg>
  )
}

function RisksIcon({ ...restProps }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round"
         strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"
         className="my-1.5 inline-block size-5" {...restProps}>
      <path d="M20 7h-9"></path>
      <path d="M14 17H5"></path>
      <circle cx="17" cy="17" r="3"></circle>
      <circle cx="7" cy="7" r="3"></circle>
    </svg>
  )
}

function HomeIcon({ ...restProps }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round"
         strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"
         className="my-1.5 inline-block size-5" {...restProps}>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
      <path
        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  )
}

function ChessKingIcon({ ...restProps }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512"
         fill="currentColor"
         stroke="currentColor"
         className="my-1.5 inline-block size-5" {...restProps}>
      <g>
        <path d="M243.358,82.765h25.27c0,0-1.722-18.991-1.722-29.826c10.817,0,31.13,3.087,31.13,3.087V28.034
          c0,0-20.314,3.096-31.13,3.096c0-10.826,3.078-31.13,3.078-31.13H242c0,0,3.096,20.304,3.096,31.13
          c-10.835,0-31.13-3.087-31.13-3.087v27.992c0,0,20.296-3.096,31.13-3.096C245.096,63.774,243.358,82.765,243.358,82.765z" />
        <path d="M202.818,227.026h106.365c0,0,18.766-52.278,25.027-79.217c2.139-9.244-6.261-20.592-20.348-20.592
          c-14.069,0-57.86,0-57.86,0s-43.808,0-57.878,0c-14.086,0-22.487,11.348-20.33,20.592
          C184.036,174.748,202.818,227.026,202.818,227.026z" />
        <path d="M331.253,375.087c-27.026-43-29.357-86.217-29.357-86.217h-91.809c0,0-2.33,43.217-29.339,86.217
          c-17.148,27.261-41.374,34.835-39.739,63.748c0.748,13.391,13.617,16.096,13.617,16.096h202.731c0,0,12.887-2.704,13.635-16.096
          C372.61,409.922,348.383,402.348,331.253,375.087z" />
        <path d="M311.392,241.165H200.61c0,8.392-8.087,14.391-16.157,19.183c-8.087,4.8-6.069,14.391,0,14.391h143.096
          c6.052,0,8.07-9.592,0-14.391C319.461,255.556,311.392,249.557,311.392,241.165z" />
        <rect x="224.192" y="96.895" width="63.6" height="16.183" />
        <polygon points="154.626,469.07 143.531,487.774 143.531,512 368.47,512 368.47,487.774 357.357,469.07 	" />
      </g>
    </svg>
  )
}

function PinIcon({ ...restProps }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         fill="currentColor"
         stroke="currentColor"
         className="my-1.5 inline-block size-5" {...restProps}>
      <g>
        <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
          <path d="M12 16.143a1 1 0 0 1 1 1V21a1 1 0 0 1-2 0v-3.857a1 1 0 0 1 1-1" />
          <path
            d="M8.447 4.223q0 .01.007.033c.05.17.12.344.198.51c.262.549.53 1.246.53 2.027v3.85c0 1.03-.442 1.97-1.109 2.666c-.49.512-.873.979-1.169 1.391c-.114.16-.133.269-.135.321a.25.25 0 0 0 .052.16c.089.126.352.319.83.319h4.985a1 1 0 1 1 0 2H7.652c-.987 0-1.93-.403-2.468-1.17c-.58-.827-.556-1.887.095-2.795c.355-.495.8-1.035 1.35-1.61c.358-.373.553-.833.553-1.282v-3.85c0-.335-.118-.71-.336-1.168a5.5 5.5 0 0 1-.31-.805c-.265-.898.081-1.68.664-2.168C7.736 2.204 8.455 2 9.124 2h3.512a1 1 0 1 1 0 2H9.124c-.303 0-.536.099-.64.186a.2.2 0 0 0-.037.037m-.005.007" />
          <path
            d="M15.553 4.223a3.5 3.5 0 0 1-.206.543c-.26.549-.529 1.246-.529 2.027v3.85c0 1.03.442 1.97 1.109 2.666c.49.512.873.979 1.169 1.391c.114.16.133.269.135.321a.25.25 0 0 1-.052.16c-.089.126-.352.319-.83.319h-4.985a1 1 0 1 0 0 2h4.985c.986 0 1.928-.403 2.467-1.17c.58-.827.556-1.887-.095-2.795c-.355-.495-.8-1.035-1.35-1.61c-.358-.373-.553-.833-.553-1.282v-3.85c0-.335.118-.71.335-1.168c.116-.243.226-.515.311-.805c.265-.898-.081-1.68-.664-2.168C16.264 2.204 15.545 2 14.876 2h-3.512a1 1 0 1 0 0 2h3.512c.303 0 .536.099.64.186q.029.026.037.037m.005.007" />
        </g>
      </g>
    </svg>)
}
