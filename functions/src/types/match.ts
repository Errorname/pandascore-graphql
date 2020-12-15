import { Max, Min } from 'class-validator'
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Int,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
  Root,
} from 'type-graphql'

import { fetch } from '../api'
import { Context } from '../context'

import { Game } from './game'
import { League } from './league'
import { Opponent, OpponentType } from './opponent'
import { Serie } from './serie'
import { Tournament } from './tournament'
import { VideoGame } from './videogames'

@ObjectType()
class MatchLive {
  @Field({ nullable: true })
  opens_at: string

  @Field({ nullable: true })
  supported: string

  @Field({ nullable: true })
  url: string
}

enum MatchType {
  best_of = 'best_of',
  custom = 'custom',
  first_to = 'first_to',
  ow_best_to = 'ow_best_of',
}

registerEnumType(MatchType, { name: 'MatchType' })

enum MatchStatus {
  canceled = 'canceled',
  finished = 'finished',
  not_started = 'not_started',
  postponed = 'postponed',
  running = 'running',
}

registerEnumType(MatchStatus, { name: 'MatchStatus' })

@ObjectType()
class Stream {
  @Field({ nullable: true })
  embed_url: string

  @Field({ nullable: true })
  raw_url: string
}

@ObjectType()
class Streams {
  @Field((type) => Stream, { nullable: true })
  english: Stream

  @Field((type) => Stream, { nullable: true })
  russian: Stream
}

@ObjectType()
class Result {
  @Field((type) => Int)
  score: number

  @Field((type) => ID)
  id(): number {
    // @ts-ignore
    return this.team_id || this.player_id
  }
}

@ObjectType()
class MatchVideoGameVersion {
  @Field({ nullable: true })
  current: boolean

  @Field({ nullable: true })
  name: string
}

@ObjectType()
export class Match {
  // Scalars

  @Field({ nullable: true })
  begin_at: string

  @Field({ nullable: true })
  detailed_stats: boolean

  @Field({ nullable: true })
  draw: boolean

  @Field({ nullable: true })
  end_at: string

  @Field({ nullable: true })
  forfeit: boolean

  @Field((type) => ID, { nullable: true })
  game_advantage: number

  @Field((type) => [Game], { nullable: true })
  games: Game[]

  @Field((type) => ID)
  id: number

  @Field((type) => MatchLive, { nullable: true })
  live: MatchLive

  @Field({ nullable: true })
  live_embed_url: string

  @Field((type) => MatchType, { nullable: true })
  match_type: MatchType

  @Field({ nullable: true })
  modified_at: string

  @Field({ nullable: true })
  name: string

  @Field((type) => Int, { nullable: true })
  number_of_games: number

  @Field({ nullable: true })
  official_stream_url: string

  @Field((type) => [Opponent], { nullable: true })
  opponents: typeof Opponent[]

  @Field((type) => OpponentType, { nullable: true })
  opponents_type: OpponentType

  @Field({ nullable: true })
  original_scheduled_at: string

  @Field({ nullable: true })
  rescheduled: boolean

  @Field((type) => [Result], { nullable: true })
  results: Result[]

  @Field({ nullable: true })
  scheduled_at: string

  @Field({ nullable: true })
  slug: string

  @Field((type) => MatchStatus, { nullable: true })
  status: MatchStatus

  @Field((type) => Streams, { nullable: true })
  streams: Streams

  @Field((type) => MatchVideoGameVersion, { nullable: true })
  videogame_version: MatchVideoGameVersion

  @Field((type) => Opponent, { nullable: true })
  winner: typeof Opponent

  // Relations

  @Field((type) => VideoGame, { nullable: true })
  videogame: VideoGame

  @Field((type) => League, { nullable: true })
  league: League

  @Field((type) => Serie)
  serie: Serie

  @Field((type) => Tournament, { nullable: true })
  tournament: Tournament
}

@InputType()
class MatchFilter {
  @Field((type) => [String], { nullable: true })
  begin_at: string[]

  @Field({ nullable: true })
  detailed_stats: boolean

  @Field({ nullable: true })
  draw: boolean

  @Field((type) => [String], { nullable: true })
  end_at: string

  @Field({ nullable: true })
  finished: boolean

  @Field({ nullable: true })
  forfeit: boolean

  @Field({ nullable: true })
  future: boolean

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field((type) => [MatchType], { nullable: true })
  match_type: MatchType[]

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field({ nullable: true })
  not_started: boolean

  @Field((type) => [Int], { nullable: true })
  number_of_games: number[]

  @Field({ nullable: true })
  official_stream_url: string

  @Field((type) => [ID], { nullable: true })
  opponent_id: number[]

  @Field({ nullable: true })
  past: boolean

  @Field({ nullable: true })
  running: boolean

  @Field((type) => [String], { nullable: true })
  scheduled_at: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [MatchStatus], { nullable: true })
  status: MatchStatus[]

  @Field({ nullable: true })
  unscheduled: boolean

  @Field((type) => ID, { nullable: true })
  winner_id: number

  @Field((type) => OpponentType, { nullable: true })
  winner_type: OpponentType

  // Relations

  @Field((type) => ID, { nullable: true })
  league_id: number

  @Field((type) => ID, { nullable: true })
  serie_id: number

  @Field((type) => ID, { nullable: true })
  tournament_id: number
}

@InputType()
class MatchRange {
  @Field((type) => [String], { nullable: true })
  begin_at: string[]

  @Field((type) => [String], { nullable: true })
  end_at: string[]

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field((type) => [MatchType], { nullable: true })
  match_type: MatchType[]

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [Int], { nullable: true })
  number_of_games: number[]

  @Field((type) => [String], { nullable: true })
  scheduled_at: string[]

  @Field((type) => [ID], { nullable: true })
  winner_id: number[]

  // Relations

  @Field((type) => [ID], { nullable: true })
  league_id: number[]

  @Field((type) => [ID], { nullable: true })
  serie_id: number[]

  @Field((type) => [ID], { nullable: true })
  tournament_id: number[]
}

@InputType()
class MatchSearch {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  status: string
}

enum MatchSort {
  begin_at_asc = 'begin_at',
  begin_at_desc = '-begin_at',
  detailed_stats_asc = 'detailed_stats',
  detailed_stats_desc = '-detailed_stats',
  draw_asc = 'draw',
  draw_desc = '-draw',
  end_at_asc = 'end_at',
  end_at_desc = '-end_at',
  forfeit_asc = 'forfeit',
  forfeit_desc = '-forfeit',
  id_asc = 'id',
  id_desc = '-id',
  match_type_asc = 'match_type',
  match_type_desc = '-match_type',
  modified_at_asc = 'modified_at',
  modified_at_desc = '-modified_at',
  name_asc = 'name',
  name_desc = '-name',
  number_of_games_asc = 'number_of_games',
  number_of_games_desc = '-number_of_games',
  scheduled_at_asc = 'scheduled_at',
  scheduled_at_desc = '-scheduled_at',
  slug_asc = 'slug',
  slug_desc = '-slug',
  status_asc = 'status',
  status_desc = '-status',
  tournament_id_asc = 'tournament_id',
  tournament_id_desc = '-tournament_id',
  winner_id_asc = 'winner_id',
  winner_id_desc = '-winner_id',
}

registerEnumType(MatchSort, { name: 'MatchSort' })

@ArgsType()
export class MatchesArgs {
  @Field((type) => MatchFilter, { nullable: true })
  filter: MatchFilter

  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number

  @Field((type) => MatchRange, { nullable: true })
  range: MatchRange

  @Field((type) => MatchSearch, { nullable: true })
  search: MatchSearch

  @Field((type) => [MatchSort], { nullable: true })
  sort: MatchSort[]
}

@Resolver((of) => Match)
export class MatchResolver {
  // Queries

  @Query((returns) => [Match])
  matches(@Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/matches', params)
  }

  @Query((returns) => Match)
  match(
    @Arg('id', { nullable: true }) id: number,
    @Arg('slug', { nullable: true }) slug: string,
    @Ctx() ctx: Context
  ) {
    if (id === undefined && slug === undefined) {
      throw new Error('Either "id" or "slug" must be used as parameter')
    }
    return fetch(ctx)(`/matches/${id || slug}`)
  }

  @Query((returns) => [Match])
  pastMatches(@Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/matches/past', params)
  }

  @Query((returns) => [Match])
  runningMatches(@Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/matches/running', params)
  }

  @Query((returns) => [Match])
  upcomingMatches(@Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/matches/upcoming', params)
  }

  // Fields

  @FieldResolver()
  league(@Root() match: Match, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${match.league.id}`)
  }

  @FieldResolver()
  serie(@Root() match: Match, @Ctx() ctx: Context) {
    return fetch(ctx)(`/series/${match.serie.id}`)
  }

  @FieldResolver()
  tournament(@Root() match: Match, @Ctx() ctx: Context) {
    return fetch(ctx)(`/tournaments/${match.tournament.id}`)
  }

  @FieldResolver()
  opponents(@Root() match: Match, @Ctx() ctx: Context) {
    return fetch(ctx)(`/matches/${match.id}/opponents`).then(
      (data: { opponents: typeof Opponent[] }) => data.opponents
    )
  }

  @FieldResolver()
  opponents_type(@Root() match: Match, @Ctx() ctx: Context) {
    return fetch(ctx)(`/matches/${match.id}/opponents`).then(
      (data: { opponent_type: OpponentType }) => data.opponent_type
    )
  }

  @FieldResolver()
  winner(@Root() match: Match, @Ctx() ctx: Context) {
    return fetch(ctx)(
      `/matches/${match.id}/opponents`
    ).then((data: { opponents: typeof Opponent[] }) =>
      data.opponents.find((op) => op.id === match.winner.id)
    )
  }
}
