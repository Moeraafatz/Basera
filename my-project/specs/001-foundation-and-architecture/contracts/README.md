# Contracts: Foundation & Architecture Page

## External Interfaces

The foundation page exposes **no external interfaces**. It is a read-only documentation page that:

- Has no API endpoints
- Has no user input forms
- Has no data persistence
- Reads data from the filesystem at render time (server component)
- Renders static content with interactive client-side tab/collapse behavior

## Internal Interfaces (within Next.js)

The page uses internal Next.js patterns but does not expose contracts beyond standard Next.js page rendering:

- Page component at `src/app/foundation/page.tsx` — standard Next.js App Router page
- Server component for filesystem reading — internal implementation detail
- Client component for tab/collapse interactivity — uses existing `use client` patterns

## Contracts Directory

No contract files are generated because there are no external interfaces to document. The page consumes no APIs and exposes no APIs.

If the project later adds CI sync verification scripts, those will be documented in a separate spec.