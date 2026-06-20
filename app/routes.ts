import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

// noinspection JSUnusedGlobalSymbols
export default [
  layout("layouts/app.tsx", [
    index("routes/home.tsx"),
    {
      file: "routes/protected.tsx",
      children: [
        route("risks-ident", "routes/risks-ident.tsx"),
        route("risks-assess", "routes/risks-assess.tsx"),
      ]
    }
  ])
] satisfies RouteConfig;
