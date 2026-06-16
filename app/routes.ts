import { type RouteConfig, index, route } from "@react-router/dev/routes";

// noinspection JSUnusedGlobalSymbols
export default [
  index("routes/home.tsx"),
  {
    file: "routes/protected.tsx",
    children: [
      route("risks", "routes/risks.tsx"),
    ]
  }
] satisfies RouteConfig;
