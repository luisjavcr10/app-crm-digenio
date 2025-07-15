1. El proyecto está construido con Next.js usando TypeScript.
2. Se utiliza TailwindCSS 4 para estilos.
3. El backend está integrado dentro del mismo proyecto y usa GraphQL sobre MongoDB (NoSQL) en /src/server/.
4. Si se usan librerías externas, deben estar alineadas con el ecosistema de Next.js.
5. Usar código idiomático y moderno de TypeScript.
6. Evitar el uso de any — preferir tipos explícitos o genéricos.
7. No usar enums; preferir union types ('typeA' | 'typeB').
8. Usar funciones flecha y componentes funcionales.
9. Evitar el uso directo de process.env en el cliente; usar variables en next.config.js si es necesario.
10. Los nombres de archivo deben seguir kebab-case para componentes y camelCase para funciones/utilidades.
11. Aplicar estilos exclusivamente con TailwindCSS, evitando style={{}} en línea.
12. Seguir las reglas de ESLint y Prettier configuradas en el proyecto.
13. Usar el sistema de rutas de la carpeta /app de Next.js (App Router).
14. Todas las operaciones GraphQL deben estar tipadas y separadas por fragmentos reutilizables
15. Usar GraphQL Codegen si está configurado en el proyecto.