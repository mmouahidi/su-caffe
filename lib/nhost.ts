import { NhostClient } from '@nhost/react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
    region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
})

const httpLink = createHttpLink({
    uri: nhost.graphql.httpUrl,
})

const authLink = setContext(async (_, { headers }) => {
    const token = nhost.auth.getAccessToken()
    return {
        headers: {
            ...headers,
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        }
    }
})

export const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export { nhost }
