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
import { Serie, SeriesArgs } from './serie'
import { Tournament, TournamentsArgs } from './tournament'
import { Match, MatchesArgs } from './match'

@ObjectType()
export class League {
  // Scalars

  @Field((type) => ID)
  id: number

  @Field({ nullable: true })
  image_url: string

  @Field({ nullable: true })
  modified_at: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  url: string

  // Relations

  @Field()
  videogame: VideoGame

  @Field((type) => [Serie])
  series: Serie[]

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
}

@InputType()
class LeagueFilter {
  @Field((type) => [ID], { nullable: true })
  id: number

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [String], { nullable: true })
  url: string[]

  @Field((type) => [ID], { nullable: true })
  videogame_id: number[]
}

@InputType()
class LeagueRange {
  @Field((type) => [ID], { nullable: true })
  id: number

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [String], { nullable: true })
  url: string[]

  @Field((type) => [ID], { nullable: true })
  videogame_id: number[]
}

@InputType()
class LeagueSearch {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  url: string
}

enum LeagueSort {
  id_asc = 'id',
  id_desc = '-id',
  modified_at_asc = 'modified_at',
  modified_at_desc = '-modified_at',
  name_asc = 'name',
  name_desc = '-name',
  slug_asc = 'slug',
  slug_desc = '-slug',
  url_asc = 'url',
  url_desc = '-url',
}

registerEnumType(LeagueSort, { name: 'LeagueSort' })

@ArgsType()
export class LeaguesArgs {
  @Field((type) => LeagueFilter, { nullable: true })
  filter: LeagueFilter

  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number

  @Field((type) => LeagueRange, { nullable: true })
  range: LeagueRange

  @Field((type) => LeagueSearch, { nullable: true })
  search: LeagueSearch

  @Field((type) => [LeagueSort], { nullable: true })
  sort: LeagueSort[]
}

@Resolver((of) => League)
export class LeagueResolver {
  // Queries

  @Query((returns) => [League])
  leagues(@Args() params: LeaguesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/leagues', params)
  }

  @Query((returns) => League, { nullable: true })
  league(
    @Arg('id', { nullable: true }) id: number,
    @Arg('slug', { nullable: true }) slug: string,
    @Ctx() ctx: Context
  ) {
    if (id === undefined && slug === undefined) {
      throw new Error('Either "id" or "slug" must be used as parameter')
    }
    return fetch(ctx)(`/leagues/${id || slug}`)
  }

  // Fields

  @FieldResolver()
  series(@Root() league: League, @Args() params: SeriesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${league.id}/series`, params)
  }

  @FieldResolver()
  matches(@Root() league: League, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${league.id}/matches`, params)
  }

  @FieldResolver()
  pastMatches(@Root() league: League, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${league.id}/matches/past`, params)
  }

  @FieldResolver()
  runningMatches(@Root() league: League, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${league.id}/matches/running`, params)
  }

  @FieldResolver()
  tournaments(@Root() league: League, @Args() params: TournamentsArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${league.id}/tournaments`, params)
  }

  @FieldResolver()
  upcomingMatches(@Root() league: League, @Args() params: MatchesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/leagues/${league.id}/matches/upcoming`, params)
  }
}
