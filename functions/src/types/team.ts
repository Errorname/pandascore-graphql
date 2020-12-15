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

import { VideoGame } from './videogames'
import { League, LeaguesArgs } from './league'
import { Match, MatchesArgs } from './match'
import { Serie, SeriesArgs } from './serie'
import { Tournament, TournamentsArgs } from './tournament'
import { Player } from './player'

@ObjectType()
export class Team {
  // Scalars

  @Field({ nullable: true })
  acronym: string

  @Field((type) => ID)
  id: number

  @Field({ nullable: true })
  image_url: string

  @Field({ nullable: true })
  location: string

  @Field({ nullable: true })
  modified_at: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  // Relations

  @Field((type) => VideoGame, { nullable: true })
  current_videogame: VideoGame

  @Field((type) => [League])
  leagues: League[]

  @Field((type) => [Serie])
  series: Serie[]

  @Field((type) => [Tournament])
  tournaments: Tournament[]

  @Field((type) => [Match])
  matches: Match[]

  @Field((type) => [Player])
  players: Player[]
}

@InputType()
class TeamFilter {
  @Field((type) => [String], { nullable: true })
  acronym: string[]

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field((type) => [String], { nullable: true })
  location: string[]

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  // Relations

  @Field((type) => [ID], { nullable: true })
  videogame_id: number[]
}

@InputType()
class TeamRange {
  @Field((type) => [String], { nullable: true })
  acronym: string[]

  @Field((type) => [ID], { nullable: true })
  id: number

  @Field((type) => [String], { nullable: true })
  location: string[]

  @Field((type) => [String], { nullable: true })
  modified_at: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [ID], { nullable: true })
  videogame_id: number[]
}

@InputType()
class TeamSearch {
  @Field({ nullable: true })
  acronym: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  url: string
}

enum TeamSort {
  acronym_asc = 'acronym',
  acronym_desc = '-acronym',
  id_asc = 'id',
  id_desc = '-id',
  location_asc = 'location',
  location_desc = '-location',
  modified_at_asc = 'modified_at',
  modified_at_desc = '-modified_at',
  name_asc = 'name',
  name_desc = '-name',
  slug_asc = 'slug',
  slug_desc = '-slug',
  videogame_id_asc = 'videogame_id',
  videogame_id_desc = '-videogame_id',
}

registerEnumType(TeamSort, { name: 'TeamSort' })

@ArgsType()
export class TeamsArgs {
  @Field((type) => TeamFilter, { nullable: true })
  filter: TeamFilter

  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number

  @Field((type) => TeamRange, { nullable: true })
  range: TeamRange

  @Field((type) => TeamSearch, { nullable: true })
  search: TeamSearch

  @Field((type) => [TeamSort], { nullable: true })
  sort: TeamSort[]
}

@Resolver((of) => Team)
export class TeamResolver {
  // Queries

  @Query((returns) => [Team])
  teams(@Args() params: TeamsArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/teams', params)
  }

  @Query((returns) => Team, { nullable: true })
  team(
    @Arg('id', { nullable: true }) id: number,
    @Arg('slug', { nullable: true }) slug: string,
    @Ctx() ctx: Context
  ) {
    if (id === undefined && slug === undefined) {
      throw new Error('Either "id" or "slug" must be used as parameter')
    }
    return fetch(ctx)(`/teams/${id || slug}`)
  }

  // Fields

  @FieldResolver()
  leagues(
    @Root() team: Team,
    @Args((type) => LeaguesArgs) params: LeaguesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/teams/${team.id}/leagues`, params)
  }

  @FieldResolver()
  series(@Root() team: Team, @Args((type) => SeriesArgs) params: SeriesArgs, @Ctx() ctx: Context) {
    return fetch(ctx)(`/teams/${team.id}/series`, params)
  }

  @FieldResolver()
  tournaments(
    @Root() team: Team,
    @Args((type) => TournamentsArgs) params: TournamentsArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/teams/${team.id}/tournaments`, params)
  }

  @FieldResolver()
  matches(
    @Root() team: Team,
    @Args((type) => MatchesArgs) params: MatchesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/teams/${team.id}/matches`, params)
  }
}
