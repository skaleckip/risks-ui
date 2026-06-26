import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

// noinspection JSUnusedGlobalSymbols
export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    {
      file: "routes/protected.tsx",
      children: [
        route(":id", "routes/system-versions.tsx"),
        route("risks-assess/:ownerUsername", "routes/risks-assess.tsx"),
        route("risks-criteria/:systemVersionId", "routes/risks-criteria.tsx"),
        route("risks-ident/:systemVersionId", "routes/risks-ident.tsx"),
      ]
    }
  ])
] satisfies RouteConfig;
