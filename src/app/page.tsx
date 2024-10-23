import Link from "next/link";
import ButtonTheme from "@/components/global/button.theme";
import { Button } from "@/components/ui/button";

const tree = `src/app
├── (logged) // Protected routes
│   ├── layout.tsx
│   ├── profile
│   │   └── page.tsx
│   └── publications
│       └── page.tsx
├── api
│   └── auth
│       └── [...nextauth]
│           └── route.ts // NextAuth.js route
├── globals.css
├── layout.tsx
├── page.tsx // Home page
└── signin // Sign in page
    └── page.tsx
`;

export default function Page() {
  return (
    <section>
      <div className="space-y-2 text-center">
        <h1 className="font-th">Welcome to your new template project!</h1>
        <p className="font-thin opacity-75">
          This template serves as a starting point for your new project. It
          includes a basic layout, authentication, (dynamic) routing, and other
          key features.
        </p>
        <Link href={"https://github.com/plvo/next-crud-starter"}>
          <Button variant={"link"}>Github Repository</Button>
        </Link>
      </div>
      <div className="border p-4 shadow-lg rounded-xl">
        <div className="font-mono md:text-xl opacity-90">
          <p>
            <span className="text-green-400">plvo@top</span>{" "}
            <span className="text-blue-600">[22:05:09]</span>{" "}
            [~/dev/next-crud-starter]{" "}
            <span className="text-green-500">
              [main <span className="text-red-500">*</span>]
            </span>
          </p>
          <p className="text-left">
            <span className="text-blue-800">-&gt; $</span> tree src/app
          </p>
        </div>
        <pre>{tree}</pre>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <Link href={"/signin"}>
          <Button>/signin page</Button>
        </Link>
        <ButtonTheme />
      </div>

      <footer className="relative w-full">
        <p className="text-foreground/50">
          Made with <span className="text-foreground">❤️</span> by{" "}
          <Link
            href={"https://github.com/plvo"}
            className="text-foreground hover:underline underline-offset-2"
          >
            plvo
          </Link>
        </p>
      </footer>
    </section>
  );
}
