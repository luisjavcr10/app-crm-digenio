import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { authResolvers } from './modules/auth/resolver';
import { authTypeDefs } from './modules/auth/typedef';
import { userResolvers } from './modules/users/resolver';
import { userTypeDefs } from './modules/users/typedef';
import { employeeTypeDefs } from './modules/employees/typedef';
import { employeeResolvers } from './modules/employees/resolver';
import { okrsTypeDefs } from './modules/okrs/schema';
import { okrsResolvers } from './modules/okrs/resolvers';
import { iaTypeDefs } from './modules/ia/schema';
import { iaResolvers } from './modules/ia/resolvers';
import { startupsTypeDefs } from './modules/startups/schema';
import { startupResolvers } from './modules/startups/resolvers';

export const typeDefs = mergeTypeDefs([authTypeDefs, employeeTypeDefs, userTypeDefs, okrsTypeDefs,iaTypeDefs, startupsTypeDefs]);
export const resolvers = mergeResolvers([authResolvers, employeeResolvers, userResolvers, okrsResolvers,iaResolvers, startupResolvers]);
