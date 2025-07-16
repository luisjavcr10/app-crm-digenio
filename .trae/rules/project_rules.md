1. The project is built with Next.js using TypeScript.
2. TailwindCSS 4 is used for styling.
3. The backend is integrated within the same project and uses GraphQL over MongoDB (NoSQL) in /src/server/.
4. If external libraries are used, they must align with the Next.js ecosystem.
5. Use idiomatic and modern TypeScript code.
6. Avoid using any — prefer explicit or generic types.
7. Do not use enums; prefer union types ('typeA' | 'typeB').
8. Use arrow functions and functional components.
9. Avoid direct use of process.env on the client; use variables in next.config.js if necessary.
10. File names should follow kebab-case for components and camelCase for functions/utilities.
11. Apply styles exclusively with TailwindCSS, avoiding inline style={{}}.
12. Follow the ESLint and Prettier rules configured in the project.
13. Use the /app folder routing system from Next.js (App Router).
14. All GraphQL operations must be typed and separated using reusable fragments.
15. Use GraphQL Codegen if it is configured in the project.