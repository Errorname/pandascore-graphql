import { IncidentResolver } from './incidents'
import { LiveResolver } from './live'
import { LeagueResolver } from './league'
import { SerieResolver } from './serie'
import { TournamentResolver } from './tournament'
import { MatchResolver } from './match'
import { TeamResolver } from './team'
import { PlayerResolver } from './player'
import { BracketStandingResolver, GroupStandingResolver } from './standing'
import { VideoGameResolver, Resolvers as VideoGamesResolvers } from './videogames'

export const resolvers: [Function, ...Function[]] = [
  // Meta
  IncidentResolver,
  LiveResolver,
  // Structure
  VideoGameResolver,
  LeagueResolver,
  SerieResolver,
  TournamentResolver,
  MatchResolver,
  TeamResolver,
  PlayerResolver,
  BracketStandingResolver,
  GroupStandingResolver,
  // Videogames
  ...VideoGamesResolvers,
]
