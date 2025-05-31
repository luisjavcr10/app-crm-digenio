// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, resolvers } from '@/server/graphql';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    // Aquí puedes añadir autenticación, headers, etc.
    return { req };
  },
});

function setCORSHeaders(response: Response): Response {
  // Clona la respuesta y añade los headers CORS
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  newResponse.headers.set('Access-Control-Allow-Credentials', 'true');
  newResponse.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return newResponse;
}

export async function OPTIONS(request: NextRequest): Promise<Response> {
  const response = new Response(null, { status: 204 });
  return setCORSHeaders(response);
}

export async function POST(request: NextRequest): Promise<Response> {
  const response = await handler(request);
  return setCORSHeaders(response);
}

export async function GET(request: NextRequest): Promise<Response> {
  const response = await handler(request);
  return setCORSHeaders(response);
}