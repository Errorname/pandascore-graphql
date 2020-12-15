import nodeFetch from 'node-fetch'
import { ArgsDictionary } from 'type-graphql'
import { URL } from 'url'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'

import { Context } from './context'

const serializeParam = (path: string[], key: string, value: any): string => {
  const newPath = [...path, key]
  const [root, ...rest] = newPath
  const newKey = root + (rest.length ? `[${rest.join('_')}]` : '')

  if (isArray(value)) {
    return `${newKey}=${value.map((v) => encodeURIComponent(v)).join(',')}`
  }

  if (isObject(value)) {
    return Object.entries(value)
      .map(([k, v]) => serializeParam(newPath, k, v))
      .join('&')
  }

  return `${newKey}=${encodeURIComponent(value)}`
}

const serializeParams = (params: any) => {
  return Object.entries(params)
    .map(([key, val]) => serializeParam([], key, val))
    .join('&')
}

const cache: {
  [url: string]: any
} = {}

export const fetch = (ctx: Context) => (path: string, params: ArgsDictionary = {}) => {
  const url = new URL(path, 'https://api.pandascore.co').href

  const serializedParams = serializeParams(params)

  const urlWithParams = `${url}${serializedParams ? '?' + serializedParams : ''}`

  if (cache[urlWithParams]) {
    return cache[urlWithParams]
  }

  console.log(`Fetch: ${urlWithParams}`)

  cache[urlWithParams] = nodeFetch(urlWithParams, {
    headers: {
      Authorization: `Bearer ${ctx.pandaScoreKey}`,
    },
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.error) {
        throw new Error(`${data.error}: ${data.message}`)
      }
      return data
    })

  return cache[urlWithParams]
}

export const getEndpointsCalled = () => {
  return Object.keys(cache)
}
