# Data Model: Foundation & Architecture Page

## Entities

### ArchitectureReference (runtime-generated, read-only)

The page renders a snapshot of the codebase architecture. It has no persistent state.

**Fields**:

- `dependencies`: `Dependency[]` — all entries from `package.json` with name, version, and purpose classification
- `directoryTree`: `FileNode[]` — recursive tree of `src/` directory with file names and descriptions
- `components`: `ComponentEntry[]` — all UI and page components with their responsibilities
- `apiRoutes`: `RouteEntry[]` — all `/api/` routes with their HTTP method, path, and purpose
- `stateStore`: `StoreEntry[]` — Zustand store slices and their actions
- `principles`: `PrincipleMapping[]` — each constitution principle mapped to the architecture decision that implements it

### Dependency

```
name: string          # e.g., "next"
version: string        # e.g., "16.2.6"
purpose: string        # e.g., "Framework"
justification: string  # why chosen over alternatives
```

### FileNode

```
name: string          # e.g., "ai-service.ts"
path: string           # e.g., "src/lib/ai-service.ts"
type: "directory" | "file"
children: FileNode[]   # only for directories
description: string    # inferred from file purpose or role
keyContent: string     # first 3 lines of file for reference (for key files only)
```

### ComponentEntry

```
name: string          # e.g., "Card"
path: string           # e.g., "src/components/ui/card.tsx"
layer: "ui-primitive" | "ui-composite" | "page" | "layout"
responsibility: string  # what UI concern this component owns
usedBy: string[]       # which pages import this component
```

### RouteEntry

```
method: string         # GET, POST, etc.
path: string           # e.g., "/api/generate"
handler: string         # e.g., "src/app/api/generate/route.ts"
purpose: string         # what the route does
contracts: ContractRef[] # request/response shapes
```

### StoreEntry

```
name: string           # store variable name
file: string           # e.g., "src/store/index.ts"
slices: string[]       # logical groupings of state
actions: string[]      # key state mutations
derivedState: string[]  # computed values
```

### PrincipleMapping

```
principle: string       # e.g., "II. Graceful Degradation"
decision: string       # e.g., "Local generation fallbacks in every AI tool"
implementation: string # exact file/code that implements this
```

## Relationships

- `ArchitectureReference` aggregates all other entities
- `ComponentEntry.usedBy` references `RouteEntry` doesn't exist — pages reference components, not routes
- `PrincipleMapping.implementation` references source file paths that exist in `FileNode`

## State Transitions

N/A — read-only documentation page. No user state, no persistence.

## Validation Rules

- All `FileNode.path` values must exist in the actual `src/` directory (enforced by CI sync check)
- All `Dependency.version` values must match `package.json` (enforced by CI sync check)
- All `ComponentEntry.path` values must reference existing files
- All `RouteEntry.handler` paths must point to existing route files

## Build-time Generation

All entities are generated at build time (or server-side on first request) by:
1. Parsing `package.json` → `Dependency[]`
2. Running `fs.readdirSync` on `src/` → `FileNode[]`
3. Scanning `src/app/` for route files → `RouteEntry[]`
4. Scanning `src/components/` for components → `ComponentEntry[]`
5. Parsing store file → `StoreEntry[]`
6. Mapping constitution principles → `PrincipleMapping[]`

No entity is hardcoded — all derive from the live codebase.