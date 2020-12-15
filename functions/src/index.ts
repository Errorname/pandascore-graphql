import * as functions from 'firebase-functions'

// eslint-disable-next-line import/no-unassigned-import
import 'reflect-metadata'
import * as path from 'path'
import { ApolloServer } from 'apollo-server-cloud-functions'
import { buildSchema } from 'type-graphql'

import { getEndpointsCalled } from './api'
import { resolvers } from './types'

export const graphql = functions.region('europe-west1').https.onRequest(async (...args) => {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile:
      process.env.FUNCTIONS_EMULATOR === 'true'
        ? path.resolve(__dirname, '../src/schema.gql')
        : false,
  })

  const server = new ApolloServer({
    schema,
    playground: false,
    introspection: true,
    context: ({ req }) => ({
      req,
      pandaScoreKey: req.headers['pandascore-key'],
    }),
    formatResponse: (response, { operationName, request }) => {
      const showLogs =
        !request.http?.headers.get('show-logs') || request.http?.headers.get('show-logs') === 'true'

      if (operationName === 'IntrospectionQuery' || !showLogs) return { ...response }

      const endpoints = getEndpointsCalled()

      return {
        ...response,
        extensions: {
          logs: {
            endpoints_count: endpoints.length,
            endpoints,
          },
        },
      }
    },
  })

  return server.createHandler({
    cors: {
      origin: '*',
    },
  })(...args)
})
