"use client";
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { BACK_URI } from "@/lib/config";

const client = new ApolloClient({
    uri: `${BACK_URI}/graphql`,
    cache: new InMemoryCache(),
});

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}