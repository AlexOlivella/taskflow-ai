# ESLint Architecture

## Objetivo

Centralizar la configuración de ESLint para todas las aplicaciones del monorepo.

## Jerarquía

base
│
├── react
│ │
│ └── next
│
└── node

## Responsabilidades

### base

Configuración común a cualquier proyecto.

- JavaScript
- Turbo
- onlyWarn
- ignores comunes

### react

Amplía base.

Añade:

- React
- React Hooks

### next

Amplía react.

Añade:

- Next.js
- Core Web Vitals

### node

Amplía base.

Añade:

- reglas específicas para Node.js
