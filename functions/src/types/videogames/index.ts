export * from './videogame'

import { LolResolver } from './lol'
import { CsgoResolver } from './csgo'
import { Dota2Resolver } from './dota2'
import { OverwatchResolver } from './overwatch'
import { PubgResolver } from './pubg'
import { RocketLeagueResolver } from './rocketleague'
import { CodMwResolver } from './codmw'
import { R6SiegeResolver } from './r6siege'
import { FifaResolver } from './fifa'

export const Resolvers = [
  LolResolver,
  CsgoResolver,
  Dota2Resolver,
  OverwatchResolver,
  PubgResolver,
  RocketLeagueResolver,
  CodMwResolver,
  R6SiegeResolver,
  FifaResolver,
]
