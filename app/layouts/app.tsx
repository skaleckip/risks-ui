import React, { type SVGProps } from "react";
import { Outlet, useNavigate } from "react-router";
import { useKeycloak } from "@react-keycloak/web";

// noinspection JSUnusedGlobalSymbols
export default function AppLayout(): React.ReactElement {
  // const { initialized, keycloak } = useKeycloak()
  const { keycloak } = useKeycloak()

  // if (!initialized) {
  //   return (<div>Loading...</div>);
  // }

  return keycloak.authenticated
    ? <PrivateLayout />
    : <PublicLayout />
}

function PublicLayout() {
  const { keycloak } = useKeycloak()

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <div className="navbar bg-base-100 gap-2">
        {/* Just to see how an SVG icon would look like */}
        <div className="flex-none">
          <ChessKingIcon />
        </div>

        <div className="flex-1">
          <span>Norman</span>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-primary btn-ghost"
            onClick={() => keycloak.login()}>
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
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-base-300 flex flex-row gap-2">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <SidebarOpenIcon />
          </label>
          <span className="flex-1">
            Norman
          </span>
          <div>
            <button
              className="btn btn-ghost btn-primary"
              onClick={() => keycloak.logout({
                // Todo, this might not work with base URL
                redirectUri: window.location.origin,
              })}>
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

            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Risks"
                      onClick={() => navigate("/risks")}>
                <RisksIcon />
                <span className="is-drawer-close:hidden">Risks</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
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