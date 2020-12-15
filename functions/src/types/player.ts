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

import { Match, MatchesArgs } from './match'
import { Team } from './team'
import { VideoGame } from './videogames'

@ObjectType()
export class Player {
  // Scalars

  @Field({ nullable: true })
  birth_year: number

  @Field({ nullable: true })
  birthday: string

  @Field({ nullable: true })
  first_name: string

  @Field({ nullable: true })
  hometown: string

  @Field((type) => ID, { nullable: true })
  id: number

  @Field({ nullable: true })
  image_url: string

  @Field({ nullable: true })
  last_name: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  nationality: string

  @Field({ nullable: true })
  role: string

  @Field({ nullable: true })
  slug: string

  // Relations

  @Field((type) => VideoGame, { nullable: true })
  current_videogame: VideoGame

  @Field((type) => [Match])
  matches: Match[]

  @Field((type) => Team, { nullable: true })
  current_team: Team
}

@InputType()
class PlayerFilter {
  @Field((type) => [Int], { nullable: true })
  birth_year: number[]

  @Field((type) => [String], { nullable: true })
  birthday: string[]

  @Field((type) => [String], { nullable: true })
  first_name: string[]

  @Field((type) => [String], { nullable: true })
  hometown: string[]

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field((type) => [String], { nullable: true })
  last_name: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  nationality: string[]

  @Field((type) => [String], { nullable: true })
  role: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [Int], { nullable: true })
  team_id: number[]

  @Field((type) => [Int], { nullable: true })
  videogame_id: number[]
}

@InputType()
class PlayerRange {
  @Field((type) => [Int], { nullable: true })
  birth_year: number[]

  @Field((type) => [String], { nullable: true })
  birthday: string[]

  @Field((type) => [String], { nullable: true })
  first_name: string[]

  @Field((type) => [String], { nullable: true })
  hometown: string[]

  @Field((type) => [ID], { nullable: true })
  id: number[]

  @Field((type) => [String], { nullable: true })
  last_name: string[]

  @Field((type) => [String], { nullable: true })
  name: string[]

  @Field((type) => [String], { nullable: true })
  nationality: string[]

  @Field((type) => [String], { nullable: true })
  role: string[]

  @Field((type) => [String], { nullable: true })
  slug: string[]

  @Field((type) => [Int], { nullable: true })
  videogame_id: number[]
}

@InputType()
class PlayerSearch {
  @Field((type) => String, { nullable: true })
  birthday: string

  @Field((type) => String, { nullable: true })
  first_name: string

  @Field((type) => String, { nullable: true })
  hometown: string

  @Field((type) => String, { nullable: true })
  last_name: string

  @Field((type) => String, { nullable: true })
  name: string

  @Field((type) => String, { nullable: true })
  nationality: string

  @Field((type) => String, { nullable: true })
  role: string

  @Field((type) => String, { nullable: true })
  slug: string
}

enum PlayerSort {
  birth_year_asc = 'birth_year',
  birth_year_desc = '-birth_year',
  birthday_asc = 'birthday',
  birthday_desc = '-birthday',
  first_name_asc = 'first_name',
  first_name_desc = '-first_name',
  hometown_asc = 'hometown',
  hometown_desc = '-hometown',
  id_asc = 'id',
  id_desc = '-id',
  last_name_asc = 'last_name',
  last_name_desc = '-last_name',
  name_asc = 'name',
  name_desc = '-name',
  nationality_asc = 'nationality',
  nationality_desc = '-nationality',
  role_asc = 'role',
  role_desc = '-role',
  slug_asc = 'slug',
  slug_desc = '-slug',
  videogame_id_asc = 'videogame_id',
  videogame_id_desc = '-videogame_id',
  team_id_asc = 'team_id',
  team_id_desc = '-team_id',
}

registerEnumType(PlayerSort, { name: 'PlayerSort' })

@ArgsType()
export class PlayersArgs {
  @Field((type) => PlayerFilter, { nullable: true })
  filter: PlayerFilter

  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number

  @Field((type) => PlayerRange, { nullable: true })
  range: PlayerRange

  @Field((type) => PlayerSearch, { nullable: true })
  search: PlayerSearch

  @Field((type) => [PlayerSort], { nullable: true })
  sort: PlayerSort[]
}

@Resolver((of) => Player)
export class PlayerResolver {
  // Queries

  @Query((returns) => [Player])
  players(@Args() params: PlayersArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/players', params)
  }

  @Query((returns) => Player, { nullable: true })
  player(
    @Arg('id', { nullable: true }) id: number,
    @Arg('slug', { nullable: true }) slug: string,
    @Ctx() ctx: Context
  ) {
    if (id === undefined && slug === undefined) {
      throw new Error('Either "id" or "slug" must be used as parameter')
    }
    return fetch(ctx)(`/players/${id || slug}`)
  }

  // Fields

  @FieldResolver()
  matches(
    @Root() player: Player,
    @Args((type) => MatchesArgs) params: MatchesArgs,
    @Ctx() ctx: Context
  ) {
    return fetch(ctx)(`/players/${player.id}/matches`, params)
  }
}
