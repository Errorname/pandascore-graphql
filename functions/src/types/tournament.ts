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

import { Context } from '../context'
import { fetch } from '../api'

import { VideoGame } from './videogames'
import { League } from './league'
import { Serie } from './serie'
import { Match, MatchesArgs } from './match'
import { Player, PlayersArgs } from './player'
import { Opponent, OpponentType } from './opponent'
import { PaginationArgs } from './helpers'
import { Standing } from './standing'

@ObjectType()
export class Tournament {
  // Scalars

  @Field({ nullable: true })
  begin_at: string

  @Field({ nullable: true })
  end_at: string

  @Field((type) => ID)
  id: number

  @Field({ nullable: true })
  live_supported: boolean

  @Field({ nullable: true })
  modified_at: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  prizepool: string

  @Field({ nullable: true })
  slug: string

  @Field((type) => ID, { nullable: true })
  winner_id: number

  @Field((type) => OpponentType, { nullable: true })
  winner_type: OpponentType

  // Relations

  @Field((type) => VideoGame)
  videogame: VideoGame

  @Field((type) => League)
  league: League

  @Field((type) => Serie)
  serie: Serie

  @Field((type) => [Match])
  matches: Match[]

  @Field((type) => [Player])
  players: Player[]

  @Field((type) => [Opponent])
  rosters: typeof Opponent[]

  @Field((type) => [Standing])
  standings: typeof Standing[]
}

@InputType()
class TournamentFilter {
  @Field((type) => [String], { nullable: true })
  begin_at: string[]

  @Field((type) => [String], { nullable: true })
  end_at: string[]

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field({ nullable: true })
  live_supported: boolean

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  prizepool: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [ID], { nullable: true })
  winner_id: number[]

  @Field((type) => [OpponentType], { nullable: true })
  winner_type: OpponentType[]

  // Relations

  @Field((type) => [ID], { nullable: true })
  videogame_id: number[]

  @Field((type) => [ID], { nullable: true })
  league_id: number[]

  @Field((type) => [ID], { nullable: true })
  serie_id: number[]
}

@InputType()
class TournamentRange {
  @Field((type) => [String], { nullable: true })
  begin_at: string[]

  @Field((type) => [String], { nullable: true })
  end_at: string[]

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  prizepool: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [ID], { nullable: true })
  winner_id: number[]

  // Relations

  @Field((type) => [ID], { nullable: true })
  videogame_id: number[]

  @Field((type) => [ID], { nullable: true })
  league_id: number[]

  @Field((type) => [ID], { nullable: true })
  serie_id: number[]
}

@InputType()
class TournamentSearch {
  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  prizepool: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]
}

enum TournamentSort {
  begin_at_asc = 'begin_at',
  begin_at_desc = '-begin_at',
  end_at_asc = 'end_at',
  end_at_desc = '-end_at',
  id_asc = 'id',
  id_desc = '-id',
  modified_at_asc = 'modified_at',
  modified_at_desc = '-modified_at',
  name_asc = 'name',
  name_desc = '-name',
  prizepool_asc = 'prizepool',
  prizepool_desc = '-prizepool',
  serie_id_asc = 'serie_id',
  serie_id_desc = '-serie_id',
  slug_asc = 'slug',
  slug_desc = '-slug',
  winner_id_asc = 'winner_id',
  winner_id_desc = '-winner_id',
  winner_type_asc = 'winner_type',
  winner_type_desc = '-winner_type',
}

registerEnumType(TournamentSort, { name: 'TournamentSort' })

@ArgsType()
export class TournamentsArgs {
  @Field((type) => TournamentFilter, { nullable: true })
  filter: TournamentFilter

  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number

  @Field((type) => TournamentRange, { nullable: true })
  range: TournamentRange

  @Field((type) => TournamentSearch, { nullable: true })
  search: TournamentSearch

  @Field((type) => [TournamentSort], { nullable: true })
  sort: TournamentSort[]
}

@Resolver((of) => Tournament)
export class TournamentResolver {
  // Queries

  @Query((returns) => [Tournament])
  tournaments(@Args() params: TournamentsArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/tournaments', params)
  }

  @Query((returns) => [Tournament])
  pastTournaments(@Args() params: TournamentsArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/tournaments/past', params)
  }

  @Query((returns) => [Tournament])
  runningTournaments(@Args() params: TournamentsArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/tournaments/running', params)
  }

  @Query((returns) => [Tournament])
  upcomingTournaments(@Args() params: TournamentsArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/tournaments/upcoming', params)
  }

  @Query((returns) => Tournament, { nullable: true })
  tournament(
    @Arg('id', { nullable: true }) id: number,
    @Arg('slug', { nullable: true }) slug: string,
    @Ctx() ctx: Context
  ) {
    if (id === undefined && slug === undefined) {
      throw new Error('Either "id" or "slug" must be used as parameter')
    }
    return fetch(ctx)(`/tournaments/${id || slug}`)
  }

  // Fields

  @FieldResolver()
  league(@Root() tournament: Tournament, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${tournament.league.id}`)
  }

  @FieldResolver()
  matches(@Root() tournament: Tournament, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/tournaments/${tournament.id}/matches`, params)
  }

  @FieldResolver()
  serie(@Root() tournament: Tournament, @Ctx() ctx: Context) {
    return fetch(ctx)(`/tournaments/${tournament.id}`)
  }

  @FieldResolver()
  players(@Root() tournament: Tournament, @Args() params: PlayersArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/tournaments/${tournament.id}/players`, params)
  }

  @FieldResolver()
  rosters(@Root() tournament: Tournament, @Ctx() ctx: Context) {
    return fetch(ctx)(`/tournaments/${tournament.id}/rosters`).then(
      (data: { rosters: typeof Opponent[] }) => data.rosters
    )
  }

  @FieldResolver()
  standings(@Root() tournament: Tournament, @Args() params: PaginationArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`tournaments/${tournament.id}/standings`, params)
  }
}
