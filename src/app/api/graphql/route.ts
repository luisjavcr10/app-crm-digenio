// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, resolvers } from 'app/lib/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({}), // tu contexto si lo necesitas
});

function withCORS(request: Request, response: Response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  const response = new Response(null, { status: 204 });
  return withCORS(null as any, response);
}

export async function POST(request: Request) {
  const response = await handler(request);
  return withCORS(request, response);
}

export async function GET(request: Request) {
  const response = await handler(request);
  return withCORS(request, response);
}
