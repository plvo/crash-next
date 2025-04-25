# next-boilerplate

A fullstack boilerplate for creating modern applications with Next.js, including authentication, advanced state management, and optimized architecture.

This boilerplate is based on a social network model because it represents the ideal use case to demonstrate various types of technical operations: CRUD operations (user profiles, posts), data fetching with pagination and streaming (feeds, comments), real-time updates (notifications), file handling (images, avatars), complex authentication flows, and even payment integrations for premium features (TODO). This makes it a comprehensive example that can be adapted to virtually any type of web application.

## Table of Contents

- [Motivation](#motivation)
- [Technologies](#main-technologies)
- [Architecture](#architecture)
  - [Folder Structure](#folder-structure)
  - [Naming Conventions](#naming-conventions)
- [Routing Schema](#routing-schema)
- [Features](#features)
- [Diagrams](#diagrams)
    - [Mutations and Invalidation](#mutations-and-invalidation)
    - [Hooks and Server Actions Architecture](#hooks-and-server-actions-architecture)
    - [`withActionWrapper` Workflow](#withactionwrapper-workflow)
    - [`useActionQuery` Hook Detail](#useactionquery-hook-detail)
    - [`useActionMutation` Hook Detail](#useactionmutation-hook-detail)
    - [Example: User Profile Update](#example-user-profile-update)
    - [Example: Caching System in `/user/<pseudo>` Page](#caching-system-in-userpseudo-page)
- [TODO](#todo)

## Motivation

1. **Stay up-to-date**: Maintain an up-to-date codebase with the latest versions of modern technologies
2. **Experimentation**: Serve as a playground to test and implement new architectures and patterns
3. **Reusable solutions**: Develop and document solutions to common problems (authentication, state management, error boundaries, etc.)
4. **Best practices**: Implement best practices in project structure, React patterns, and full-stack architecture

## Technologies

- **TypeScript** - Static typing for JavaScript
- **Next.js 15** - React framework with server rendering and API routes
- **React 19** - UI library

- **Prisma** - Modern ORM for TypeScript
- **MySQL** - Relational database
- **NextAuth.js** - Complete authentication solution
- **Tanstack Query** - Server state management and caching
- **Server Actions** - Native Next.js server actions

- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/UI** - Reusable UI components
- **Radix UI** - Accessible component primitives
- **Next Themes** - Theme management
- **Sonner** - Toast notifications
- **Lucide React** - Icons

- **React Hook Form** - Form management
- **Zod** - TypeScript-first schema validation
- **Shext** - React Hook Form utilities

- **Biome** - Linter and formatter
- **Husky** - Git hooks
- **bun** - JavaScript runtime

## Architecture

### Folder Structure

```
src/
├── actions/               # Server actions by entity
│   ├── publication/       # Publication actions
│   │   ├── create.ts      # Publication creation
│   │   └── get.ts         # Publication retrieval
│   └── user/              # User actions
│       ├── create.ts
│       ├── get.ts
│       └── update.ts
├── app/                   # Next.js App Router routes
│   ├── (logged)/          # Protected routes
│   │   ├── publications/
│   │   └── user/
│   ├── api/               # API Routes
│   └── signin/            # Public route
├── components/            # React components
│   ├── publications/      # Publication-related components
│   ├── shared/            # Shared components
│   ├── signin/            # Sign-in components
│   ├── ui/                # shadcn/ui components
│   └── user/              # User components
├── hooks/                 # Custom React hooks
│   ├── use-publication.ts # Each entity has its own hook
│   ├── use-user.ts
│   └── use-action.ts      # Generic hook used by entity hooks
├── lib/                   # Utilities and configurations
│   ├── action-wrappers.ts
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
├── styles/                # Global styles
└── types/                 # TypeScript types
```

### Naming Conventions

- **Files**: kebab-case (`dialog.edit-profile.tsx`)
- **Components**: PascalCase (`DialogEditProfile`)
- **Types**: PascalCase (`PublicationWithAuthor`)
- **Hooks**: camelCase with `use-*` prefix (`useUserQuery`)
- **Server Actions**: camelCase (`createPublication`)
- **Component files**: component type and name, example for a sign-in form: `form.*.tsx` -> `form.signin.tsx`

#### Components

The `components/` directory is organized by functional domain:
- `shared/`: Reusable components across the application
- `ui/`: Base UI components (buttons, modals, etc.)
- `ui/shuip/`: Custom UI component extensions
- `[page]/`: Page-specific components

#### Actions

Each entity has its own directory:
- Actions organized by operation type (create, get, update...)
- Uses `withActionWrapper` for error handling
- Defined types for options and returns

#### Hooks

One hook per entity for data management:
- `use-user.ts`: User queries and mutations
- `use-publication.ts`: Publication management
- `use-action.ts`: Generic hook for Server Actions + Tanstack Query

## Routing Schema

```bash
/                      # Home page (public)
/signin                # Sign-in page
/publications          # Publications list (protected)
/user/[pseudo]         # User profile (protected)
```

## Features

### Error Handling with QueryBoundary

The `QueryBoundary` component combines `React.Suspense` and `react-error-boundary` for elegant loading and error state management:

```typescript
<QueryBoundary 
  loadingFallback={<Skeleton />}
  errorFallback={<ErrorComponent />}
>
  <Component />
</QueryBoundary>
```

### Typed Server Actions

Server Actions are wrapped with `withActionWrapper` for consistent error handling and types:

```typescript
export const createPublication = async (data) => {
  return withActionWrapper<PublicationWithAuthor>(async (prisma) => {
    // Business logic
  });
};
```

### Reusable Hooks

Each entity has dedicated hooks that encapsulate query and mutation logic:

```typescript
const { data } = useUserQuery({ 
  id: userId, 
  withPublications: true 
});

const { mutate } = useUserMutation({
  onSuccess: () => {
    // Invalidation and redirection
  }
});
```

## Diagrams

### Mutations and Invalidation

```mermaid
sequenceDiagram
    participant C as Component
    participant H as Hook
    participant A as Server Action
    participant DB as Database
    participant Q as QueryCache

    C->>H: useMutation + form.submit
    H->>A: Appel Server Action
    A->>DB: Mutation Prisma
    DB-->>A: Résultat
    A-->>H: ApiResponse<T>
    H->>Q: Invalidate queries
    Q-->>C: Mise à jour UI
```

### Hooks and Server Actions Architecture
```mermaid
graph TD
    subgraph "Client Components"
        C1[form.signin.tsx]
        C2[dialog.edit-profile.tsx]
        C3[card.publication.tsx]
    end

    subgraph "Custom Hooks"
        H1[useUserQuery]
        H2[useUserMutation]
        H3[UsePublicationQuery]
        H4[useNewPublication]
    end

    subgraph "Generic Hooks"
        G1[useActionQuery]
        G2[useActionMutation]
    end

    subgraph "Server Actions"
        A1[getUser]
        A2[updateUser]
        A3[getPublication]
        A4[createPublication]
    end

    subgraph "Wrappers"
        W[withActionWrapper]
    end

    C1-->H1
    C2-->H2
    C3-->H3
    C2-->H4

    H1-->G1
    H2-->G2
    H3-->G1
    H4-->G2

    G1-->A1
    G1-->A3
    G2-->A2
    G2-->A4

    A1-->W
    A2-->W
    A3-->W
    A4-->W

    W-->DB[(Database)]
```


### `withActionWrapper` Workflow
```mermaid
sequenceDiagram
    participant C as Component
    participant H as useActionMutation
    participant A as updateUser
    participant W as withActionWrapper
    participant P as prisma.user.update
    participant E as Error Handler

    C->>H: mutate(userId, userData)
    H->>A: updateUser({id, data})
    A->>W: withActionWrapper(action)
    W->>P: Execute Prisma query
    alt Success
        P-->>W: User data
        W-->>A: {ok: true, data}
        A-->>H: ApiSuccess<User>
        H->>C: onSuccess callback
        H->>C: Toast success
    else Error
        P-->>W: Error
        W->>E: getMessageError(error)
        E-->>W: Error message
        W-->>A: {ok: false, message}
        A-->>H: ApiError
        H->>C: onError callback
        H->>C: Toast error
    end
    W->>P: prisma.$disconnect()
```

### `useActionQuery` Hook Detail

```mermaid
sequenceDiagram
    participant C as Component
    participant H as useActionQuery
    participant Q as useSuspenseQuery
    participant A as Server Action
    participant E as ErrorBoundary
    participant S as Suspense

    C->>H: useActionQuery({queryKey, actionFn})
    H->>Q: Configure useSuspenseQuery
    Q->>A: Execute actionFn
    A-->>Q: ApiResponse<T>
    alt Success (ok: true)
        Q->>Q: select: (response) => response.data
        Q-->>H: Data extracted
        H-->>C: Return data
    else Error (ok: false)
        Q->>E: Throw Error(response.message)
        E-->>S: Catch error
        S-->>C: Show errorFallback
    end
```

### `useActionMutation` Hook Detail

```mermaid
sequenceDiagram
    participant C as Component
    participant H as useActionMutation
    participant M as useMutation
    participant A as Server Action
    participant T as Toast (Sonner)
    participant Q as QueryClient

    C->>H: useActionMutation({actionFn, successEvent})
    H->>M: Configure mutation
    C->>M: mutate(variables)
    M->>A: actionFn(variables)
    A-->>M: ApiResponse<T>
    alt Success (ok: true)
        M->>T: Show success toast
        M->>H: Call successEvent.fn
        M->>Q: invalidateQueries(keys)
        Q-->>C: Refresh UI
    else Error (ok: false)
        M->>T: Show error toast
        M->>H: Call errorEvent.fn
        M-->>C: Return error state
    end
```


### Example: User Profile Update

```mermaid
sequenceDiagram
    participant U as User
    participant D as DialogEditProfile
    participant F as useZodForm
    participant H as useUserMutation
    participant S as update (NextAuth)
    participant A as updateUser
    participant W as withActionWrapper
    participant P as Prisma
    participant Q as QueryClient

    U->>D: Open Dialog
    D->>F: Initialize form with userData
    U->>D: Edit & Submit
    D->>F: Validate with Zod schema
    F-->>D: Form is valid
    D->>H: mutate(userId, changedFields)
    H->>A: updateUser({id, data})
    A->>W: withActionWrapper(async (prisma) => {...})
    W->>P: prisma.user.update()
    P-->>W: Updated user
    W-->>A: {ok: true, data}
    A-->>H: ApiResponse<User>
    H->>S: update(session)
    S-->>H: Session updated
    H->>Q: invalidateQueries(['user', id])
    Q-->>D: Trigger re-render
    H->>D: onSuccess callback
    D->>U: Close dialog + Toast success
```

### Example: Caching System in `/user/<pseudo>` page

```mermaid
graph LR
    subgraph "Composants"
        C1[HeaderProfile]
        C2[DialogEditProfile]
        C3[PublicationsList]
    end

    subgraph "Tanstack Query Cache"
        direction TB
        Q1["queryKey: ['user', userId]"]
        Q2["queryKey: ['publications']"]
        Q3["queryKey: ['publication', pubId]"]
    end

    subgraph "Invalidation"
        I1[invalidateQueries]
    end

    C1--useUserQuery-->Q1
    C2--useUserMutation-->I1
    C3--UsePublicationsQueryByAuthor-->Q2
    C3--UsePublicationQuery-->Q3

    I1--"invalide après mutation"-->Q1
    I1--"invalide après mutation"-->Q2
    I1--"invalide après mutation"-->Q3
```

## TODO
1. **Authentication**
    - [ ] Implement account creation with email verification
    - [ ] Add OTP authentication
    - [ ] Add 2FA authentication
    - [ ] Integrate OAuth providers (Google, GitHub)
2. **Performance**
    - [ ] Optimize Prisma queries with additional indexes
    - [ ] Performance optimization with `React.Suspense`
3. **Security**
    - [ ] Implement rate limiting
    - [ ] Add Content Security Policy headers
4. **Tests**
    - [ ] Add E2E tests (Playwright)
    - [ ] Add stress tests with k6
5. **Features**
    - [ ] Add publication search
    - [ ] Implement real-time notifications
    - [ ] Add comments / like system
    - [ ] Implement user following
6. **DevOps**
    - [ ] Configure Docker for development
    - [ ] Implement monitoring with Prometheus/Grafana
    - Cloud: Terraform with Amplify

## Contributing

Contributions are welcome. Please follow the established code conventions and create pull requests for any new features or bug fixes.

## License

MIT License - see the [LICENSE](LICENSE) file for more details.