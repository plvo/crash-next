# crash-next

A Next.js starter designed as an evolving playground for experimenting with modern fullstack patterns, tools, and libraries.

This project is not a fixed boilerplate — it's meant to test ideas, refine architecture decisions, and stay aligned with the latest updates in the Next.js ecosystem. It can serve as a base for real projects, quick prototypes, or simply to explore what's possible with current best practices.

## Goals

1. **Experimentation**: Try out new patterns, libraries, and workflows.
2. **Code reuse**: Maintain reusable logic for common fullstack tasks (auth, forms, API actions, etc).
3. **Up-to-date stack**: Keep pace with evolving Next.js capabilities and the React ecosystem.
4. **Clean architecture**: Test scalable patterns for server actions, client state, and component organization.

## Tech Stack

* **Next.js 15** (App Router, Server Actions)
* **React 19**
* **TypeScript**
* **Prisma** (ORM) + **MySQL**
* **NextAuth.js**
* **Tanstack Query**
* **TailwindCSS**, **shadcn/ui**, **Radix UI**
* **Zod** (validation), **React Hook Form**
* **Biome**, **Husky**, **bun** (runtime)

## Architecture Overview

Modular and entity-based structure:

```
src/
├── actions/         # Server-side business logic
├── app/             # App Router pages (including protected routes)
├── components/      # UI + domain-specific components
├── hooks/           # Data hooks for each entity
├── lib/             # Utilities, Prisma, auth, config
├── styles/          # Tailwind and global styles
└── types/           # Shared TypeScript types
```

Naming follows simple conventions (`use-*` for hooks, PascalCase for components, kebab-case for files).

## Routing

```bash
/                      # Public home
/signin                # Sign in
/publications          # Protected content
/user/[pseudo]         # User profile (protected)
```

## Core Features

* **Server Actions** wrapped with standardized error handling (`withActionWrapper`)
* **Typed hooks** (`useActionQuery`, `useActionMutation`) to bridge actions and UI
* **Suspense + Error Boundaries** with `QueryBoundary`
* **Pattern-based folder structure** for scalability
* **Reusable form and validation setup** with Zod and React Hook Form
* **Data caching and invalidation** using Tanstack Query

## TODO

Planned areas of work:

* Authentication: OTP, 2FA, OAuth
* Real-time: Notifications, live updates
* DevOps: Docker setup, monitoring, cloud deploy (e.g., Amplify + Terraform)
* Performance: Query optimization, React Suspense
* Testing: Playwright E2E, load testing (k6)

## Contributing

Feel free to fork or open PRs. This repo is meant to evolve — suggestions, new patterns, or experimental branches are welcome.

## License

MIT — see the [LICENSE](LICENSE) file.
