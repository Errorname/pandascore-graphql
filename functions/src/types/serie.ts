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

import { League } from './league'
import { Tournament, TournamentsArgs } from './tournament'
import { Match, MatchesArgs } from './match'
import { VideoGame } from './videogames'
import { Player, PlayersArgs } from './player'
import { OpponentType } from './opponent'

@ObjectType()
export class Serie {
  // Scalars

  @Field((type) => String, { nullable: true })
  begin_at: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  end_at: string

  @Field({ nullable: true })
  full_name: string

  @Field((type) => ID)
  id: number

  @Field({ nullable: true })
  modified_at: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  season: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  tier: string

  @Field((type) => ID, { nullable: true })
  winner_id: number

  @Field((type) => OpponentType, { nullable: true })
  winner_type: OpponentType

  @Field((type) => Int, { nullable: true })
  year: number

  // Relations

  @Field((type) => VideoGame)
  videogame: VideoGame

  @Field((type) => League)
  league: League

  @Field((type) => [Tournament])
  tournaments: Tournament[]

  @Field((type) => [Match])
  matches: Match[]

  @Field((type) => [Match])
  pastMatches: Match[]

  @Field((type) => [Match])
  runningMatches: Match[]

  @Field((type) => [Match])
  upcomingMatches: Match[]

  @Field((type) => [Player])
  players: Player[]
}

@InputType()
class SerieFilter {
  @Field((type) => [String], { nullable: true })
  begin_at: string[]

  @Field((type) => [String], { nullable: true })
  description: string[]

  @Field((type) => [String], { nullable: true })
  end_at: string[]

  @Field((type) => ID, { nullable: true })
  id: number[]

  @Field((type) => ID, { nullable: true })
  league_id: number[]

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  season: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [String], { nullable: true })
  tier: string[]

  @Field((type) => ID, { nullable: true })
  winner_id: number[]

  @Field((type) => [OpponentType], { nullable: true })
  winner_type: OpponentType[]

  @Field((type) => Int, { nullable: true })
  year: number[]
}

@InputType()
class SerieRange {
  @Field((type) => [String], { nullable: true })
  begin_at: string[]

  @Field((type) => [String], { nullable: true })
  description: string[]

  @Field((type) => [String], { nullable: true })
  end_at: string[]

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  season: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [String], { nullable: true })
  tier: string[]

  @Field((type) => [ID], { nullable: true })
  winner_id: number[]

  @Field((type) => [OpponentType], { nullable: true })
  winner_type: OpponentType[]

  @Field((type) => [Int], { nullable: true })
  year: number[]

  // Relations

  @Field((type) => [ID], { nullable: true })
  league_id: number[]
}

@InputType()
class SerieSearch {
  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  season: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  tier: string
}

enum SerieSort {
  begin_at_asc = 'begin_at',
  begin_at_desc = '-begin_at',
  description_asc = 'description',
  description_desc = '-description',
  end_at_asc = 'end_at',
  end_at_desc = '-end_at',
  id_asc = 'id',
  id_desc = '-id',
  league_id_asc = 'league_id',
  league_id_desc = '-league_id',
  modified_at_asc = 'modified_at',
  modified_at_desc = '-modified_at',
  name_asc = 'name',
  name_desc = '-name',
  season_asc = 'season',
  season_desc = '-season',
  slug_asc = 'slug',
  slug_desc = '-slug',
  tier_asc = 'tier',
  tier_desc = '-tier',
  winner_id_asc = 'winner_id',
  winner_id_desc = '-winner_id',
  winner_type_asc = 'winner_type',
  winner_type_desc = '-winner_type',
  year_asc = 'year',
  year_desc = '-year',
}

registerEnumType(SerieSort, { name: 'SerieSort' })

@ArgsType()
export class SeriesArgs {
  @Field((type) => SerieFilter, { nullable: true })
  filter: SerieFilter

  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number

  @Field((type) => SerieRange, { nullable: true })
  range: SerieRange

  @Field((type) => SerieSearch, { nullable: true })
  search: SerieSearch

  @Field((type) => [SerieSort], { nullable: true })
  sort: SerieSort[]
}

@Resolver((of) => Serie)
export class SerieResolver {
  // Queries

  @Query((returns) => [Serie])
  series(@Args() params: SeriesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/series', params)
  }

  @Query((returns) => [Serie])
  pastSeries(@Args() params: SeriesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/series/past', params)
  }

  @Query((returns) => [Serie])
  runningSeries(@Args() params: SeriesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/series/running', params)
  }

  @Query((returns) => [Serie])
  upcomingSeries(@Args() params: SeriesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/series/upcoming', params)
  }

  @Query((returns) => Serie, { nullable: true })
  serie(
    @Arg('id', { nullable: true }) id: number,
    @Arg('slug', { nullable: true }) slug: string,
    @Ctx() ctx: Context
  ) {
    if (id === undefined && slug === undefined) {
      throw new Error('Either "id" or "slug" must be used as parameter')
    }
    return fetch(ctx)(`/series/${id || slug}`)
  }

  // Fields

  @FieldResolver()
  league(@Root() serie: Serie, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${serie.league.id}`)
  }

  @FieldResolver()
  matches(@Root() serie: Serie, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/series/${serie.id}/matches`, params)
  }

  @FieldResolver()
  pastMatches(@Root() serie: Serie, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/series/${serie.id}/matches/past`, params)
  }

  @FieldResolver()
  runningMatches(@Root() serie: Serie, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/series/${serie.id}/matches/running`, params)
  }

  @FieldResolver()
  tournaments(@Root() serie: Serie, @Args() params: TournamentsArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/series/${serie.id}/tournaments`, params)
  }

  @FieldResolver()
  upcomingMatches(@Root() serie: Serie, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/series/${serie.id}/matches/upcoming`, params)
  }

  @FieldResolver()
  players(@Root() serie: Serie, @Args() params: PlayersArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/series/${serie.id}/players`, params)
  }
}
