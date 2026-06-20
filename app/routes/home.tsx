import type { Route } from "./+types/home";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman" },
    { name: "description", content: "Your ISO 27K guy!" },
  ];
}

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-xl">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-8xl text-neutral/20 dark:text-neutral-content/20">ISO 27K</p>
      </div>
    </div>
  )
}
