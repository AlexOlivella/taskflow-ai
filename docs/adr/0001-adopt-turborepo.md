# Contexto

TaskFlow AI nace como una aplicación web, pero se diseña con la intención de crecer en el futuro incorporando:

- Frontend web
- Backend
- Aplicación móvil
- Librerías compartidas

Necesitamos una arquitectura que facilite compartir código y configuración entre estos proyectos sin duplicar esfuerzos.

## Alternativas

### Repositorios independientes

Separar cada aplicación en un repositorio diferente.

### Nx

Framework para monorepos con muchas funcionalidades integradas.

### Turborepo

Monorepo ligero basado en pipelines y cache distribuida.

# Decisión

Se adopta Turborepo como gestor del monorepo.

La decisión se basa en los siguientes criterios:

- Compartir componentes y paquetes.
- Compartir configuración (TypeScript, ESLint, etc.).
- Ejecutar tareas mediante una única pipeline.
- Facilitar la escalabilidad del producto sin duplicar configuración.
- Se acepta el incremento de complejidad inicial a cambio de mejorar la mantenibilidad y la escalabilidad a largo plazo.

# Consecuencias

## Positivas

- Existe una única fuente de verdad para configuraciones compartidas.
- Se reduce la duplicación de código.
- Es sencillo añadir nuevas aplicaciones al monorepo.
- Los paquetes compartidos pueden reutilizarse en varios proyectos.
- Turbo permite optimizar tiempos de ejecución mediante caché.

## Negativas

- Mayor complejidad inicial.
- Curva de aprendizaje superior a un proyecto tradicional.
- Es necesario definir una estructura de paquetes desde el inicio.

# Estado

Aceptado
