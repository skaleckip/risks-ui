import type { Route } from "./+types/home";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman" },
    { name: "description", content: "Your ISO guy!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <p>Welcome!</p>
      <p>I am Norman, your ISO guy.</p>
    </div>
  )
}
