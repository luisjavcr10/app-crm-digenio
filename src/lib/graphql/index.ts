import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { authResolvers } from './modules/auth/resolvers';
import { authTypeDefs } from './modules/auth/schema';
import { userResolvers } from './modules/users/resolvers';
import { userTypeDefs } from './modules/users/schema';

export const typeDefs = mergeTypeDefs([authTypeDefs, userTypeDefs]);
export const resolvers = mergeResolvers([authResolvers, userResolvers]);