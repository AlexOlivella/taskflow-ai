```
TypeScript configuration hierarchy

base.json
    │
    ▼
node.json
    │
    ▼
library.json
    │
    ▼
react.json
    │
    ▼
next.json

Cada configuración añade una responsabilidad específica sobre la anterior, evitando duplicación y manteniendo una jerarquía clara y extensible.


Responsabilidad de cada configuración:

# base.json

Configuración común para cualquier proyecto TypeScript.

strict
target
isolatedModules
moduleDetection
...

-----------------------

# node.json

Configuración específica del entorno Node.

module
moduleResolution
library.json

Configuración necesaria para generar librerías reutilizables.

declaration
declarationMap

-------------------

#react.json

Configuración específica para proyectos React.

jsx: react-jsx

--------------------

#next.json

Configuración específica para aplicaciones Next.js.

plugin de Next
allowJs
noEmit
DOM
Bundler


---------------------

> ¿Por qué `library.json` hereda de `node.json`?

> Aunque conceptualmente una librería y Node representan responsabilidades distintas, el ecosistema del proyecto utiliza Node para compilar y resolver módulos. Por ello, las librerías heredan de `node.json`, evitando duplicar la configuración de módulos y manteniendo una jerarquía lineal compatible con el sistema de herencia de `tsconfig.json`.








```
