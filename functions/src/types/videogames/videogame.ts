import {
  Arg,
  Args,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InterfaceType,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { Context } from '../../context'
import { fetch } from '../../api'

import { League, LeaguesArgs } from '../league'
import { Serie, SeriesArgs } from '../serie'
import { Tournament, TournamentsArgs } from '../tournament'
import { Match, MatchesArgs } from '../match'
import { Team, TeamsArgs } from '../team'
import { Player, PlayersArgs } from '../player'

export type VideoGameConfig = {
  id: number
  name: string
  slug: string
  endpoint: string
  __typename: string
}

export const videogames: VideoGameConfig[] = [
  { id: 1, name: 'LoL', slug: 'league-of-legends', endpoint: 'lol', __typename: 'Lol' },
  { id: 3, name: 'CS:GO', slug: 'cs-go', endpoint: 'csgo', __typename: 'Csgo' },
  { id: 4, name: 'Dota 2', slug: 'dota-2', endpoint: 'dota2', __typename: 'Dota2' },
  { id: 14, name: 'Overwatch', slug: 'ow', endpoint: 'ow', __typename: 'Overwatch' },
  { id: 20, name: 'PUBG', slug: 'pubg', endpoint: 'pubg', __typename: 'Pubg' },
  { id: 22, name: 'Rocket League', slug: 'rl', endpoint: 'rl', __typename: 'RocketLeague' },
  {
    id: 23,
    name: 'Call of Duty Modern Warfare',
    slug: 'cod-mw',
    endpoint: 'codmw',
    __typename: 'CodMw',
  },
  { id: 24, name: 'Rainbow 6 Siege', slug: 'r6-siege', endpoint: 'r6siege', __typename: 'R6Siege' },
  { id: 25, name: 'FIFA', slug: 'fifa', endpoint: 'fifa', __typename: 'Fifa' },
]

const endpointOf = (videogame: VideoGame) =>
  videogames.find((game) => game.id === videogame.id)?.endpoint

@InterfaceType({
  resolveType: (value) => {
    return videogames.find((game) => game.id === value.id)?.__typename
  },
})
export abstract class VideoGame {
  // Scalars

  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  slug: string

  @Field({ nullable: true })
  current_version?: string

  // Relations

  // Leagues
  @Field((type) => [League])
  leagues: League[]

  // Series
  @Field((type) => [Serie])
  series: Serie[]

  @Field((type) => [Serie])
  pastSeries: Serie[]

  @Field((type) => [Serie])
  runningSeries: Serie[]

  @Field((type) => [Serie])
  upcomingSeries: Serie[]

  // Tournaments
  @Field((type) => [Tournament])
  tournaments: Tournament[]

  @Field((type) => [Tournament])
  pastTournaments: Tournament[]

  @Field((type) => [Tournament])
  runningTournaments: Tournament[]

  @Field((type) => [Tournament])
  upcomingTournaments: Tournament[]

  // Matches
  @Field((type) => [Match])
  matches: Match[]

  @Field((type) => [Match])
  pastMatches: Match[]

  @Field((type) => [Match])
  runningMatches: Match[]

  @Field((type) => [Match])
  upcomingMatches: Match[]

  // Teams
  @Field((type) => [Team])
  teams: Team[]

  // Players
  @Field((type) => [Player])
  players: Player[]
}

@Resolver((of) => VideoGame)
export class VideoGameResolver {
  // Query
  @Query((returns) => VideoGame, { nullable: true })
  videogame(
    @Arg('id', { nullable: true }) id: number,
    @Arg('slug', { nullable: true }) slug: string
  ) {
    if (id !== undefined) {
      return videogames.find((game) => game.id === id)
    }

    if (slug !== undefined) {
      return videogames.find((game) => game.slug === slug)
    }

    throw new Error('Either "id" or "slug" must be used as parameter')
  }

  @Query((type) => [VideoGame])
  videogames() {
    return videogames
  }

  // Fields

  // Leagues
  @FieldResolver((type) => [League])
  leagues(
    @Root() videogame: VideoGame,
    @Args((type) => LeaguesArgs) params: LeaguesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/leagues`, params)
  }

  // Series
  @FieldResolver((type) => [Serie])
  series(
    @Root() videogame: VideoGame,
    @Args((type) => SeriesArgs) params: SeriesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/series`, params)
  }

  @FieldResolver((type) => [Serie])
  pastSeries(
    @Root() videogame: VideoGame,
    @Args((type) => SeriesArgs) params: SeriesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/series/past`, params)
  }

  @FieldResolver((type) => [Serie])
  runningSeries(
    @Root() videogame: VideoGame,
    @Args((type) => SeriesArgs) params: SeriesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/series/running`, params)
  }

  @FieldResolver((type) => [Serie])
  upcomingSeries(
    @Root() videogame: VideoGame,
    @Args((type) => SeriesArgs) params: SeriesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/series/upcoming`, params)
  }

  // Tournaments
  @FieldResolver((type) => [Tournament])
  tournaments(
    @Root() videogame: VideoGame,
    @Args((type) => TournamentsArgs) params: TournamentsArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/tournaments`, params)
  }

  @FieldResolver((type) => [Tournament])
  pastTournaments(
    @Root() videogame: VideoGame,
    @Args((type) => TournamentsArgs) params: TournamentsArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/tournaments/past`, params)
  }

  @FieldResolver((type) => [Tournament])
  runningTournaments(
    @Root() videogame: VideoGame,
    @Args((type) => TournamentsArgs) params: TournamentsArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/tournaments/running`, params)
  }

  @FieldResolver((type) => [Tournament])
  upcomingTournaments(
    @Root() videogame: VideoGame,
    @Args((type) => TournamentsArgs) params: TournamentsArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/tournaments/upcoming`, params)
  }

  // Matches
  @FieldResolver((type) => [Match])
  matches(
    @Root() videogame: VideoGame,
    @Args((type) => MatchesArgs) params: MatchesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/matches`, params)
  }

  @FieldResolver((type) => [Match])
  pastMatches(
    @Root() videogame: VideoGame,
    @Args((type) => MatchesArgs) params: MatchesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/matches/past`, params)
  }

  @FieldResolver((type) => [Match])
  runningMatches(
    @Root() videogame: VideoGame,
    @Args((type) => MatchesArgs) params: MatchesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/matches/running`, params)
  }

  @FieldResolver((type) => [Match])
  upcomingMatches(
    @Root() videogame: VideoGame,
    @Args((type) => MatchesArgs) params: MatchesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/matches/upcoming`, params)
  }

  // Teams
  @FieldResolver((type) => [Team])
  teams(
    @Root() videogame: VideoGame,
    @Args((type) => TeamsArgs) params: TeamsArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/teams`, params)
  }

  // Players
  @FieldResolver((type) => [Player])
  players(
    @Root() videogame: VideoGame,
    @Args((type) => PlayersArgs) params: PlayersArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/${endpointOf(videogame)}/players`, params)
  }
}
