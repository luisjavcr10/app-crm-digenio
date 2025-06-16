import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { authResolvers } from './modules/auth/resolvers';
import { authTypeDefs } from './modules/auth/typedefs';
import { userResolvers } from './modules/users/resolvers';
import { userTypeDefs } from './modules/users/typedefs';
import { employeeTypeDefs } from './modules/employees/typedefs';
import { employeeResolvers } from './modules/employees/resolvers';
import { teamResolvers } from './modules/teams/resolvers';
import { teamTypeDefs } from './modules/teams/typedefs';
import { okrsTypeDefs } from './modules/okrs/typedefs';
import { okrsResolvers } from './modules/okrs/resolvers';
import { iaTypeDefs } from './modules/ia/typedefs';
import { iaResolvers } from './modules/ia/resolvers';
import { startupsTypeDefs } from './modules/startups/typedefs';
import { startupResolvers } from './modules/startups/resolvers';

export const typeDefs = mergeTypeDefs([authTypeDefs, userTypeDefs, employeeTypeDefs, teamTypeDefs, okrsTypeDefs, iaTypeDefs, startupsTypeDefs]);
export const resolvers = mergeResolvers([authResolvers, userResolvers,, employeeResolvers, teamResolvers, okrsResolvers,iaResolvers, startupResolvers]);
