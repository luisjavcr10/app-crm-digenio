// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, resolvers } from 'app/lib/graphql';

// Tipos para TypeScript
import type { NextApiRequest, NextApiResponse } from 'next';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Considera añadir:
  introspection: process.env.NODE_ENV !== 'production',
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => {
    // Aquí puedes añadir autenticación, headers, etc.
    return { req };
  },
});

function setCORSHeaders(res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // O tu dominio específico
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
  const response = setCORSHeaders(res);
  response.status(204).end();
  return response;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const response = setCORSHeaders(res);
  return handler(req, response);
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = setCORSHeaders(res);
  return handler(req, response);
}