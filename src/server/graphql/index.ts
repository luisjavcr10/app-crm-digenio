import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { authResolvers } from './modules/auth/resolvers';
import { authTypeDefs } from './modules/auth/schema';
import { userResolvers } from './modules/users/resolvers';
import { userTypeDefs } from './modules/users/schema';
import { okrsTypeDefs } from './modules/okrs/schema';
import { okrsResolvers } from './modules/okrs/resolvers';
import { iaTypeDefs } from './modules/ia/schema';
import { iaResolvers } from './modules/ia/resolvers';

export const typeDefs = mergeTypeDefs([authTypeDefs, userTypeDefs, okrsTypeDefs, iaTypeDefs]);
export const resolvers = mergeResolvers([authResolvers, userResolvers, okrsResolvers, iaResolvers]);