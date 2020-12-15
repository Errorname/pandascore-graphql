import {
  createUnionType,
  Ctx,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Resolver,
  Root,
} from 'type-graphql'

import { fetch } from '../api'
import { Context } from '../context'

import { Match } from './match'
import { Team } from './team'

@ObjectType()
class BracketStanding {
  @Field((type) => Match, { nullable: true })
  last_match: Match

  @Field((type) => Int)
  rank: number

  @Field((type) => Team)
  team: Team
}

@ObjectType()
class GroupStanding {
  @Field((type) => Int)
  losses: number

  @Field((type) => Int)
  rank: number

  @Field((type) => Team)
  team: Team

  @Field((type) => Int)
  ties: number

  @Field((type) => Int)
  total: number

  @Field((type) => Int)
  wins: number
}

export const Standing = createUnionType({
  name: 'Standing',
  types: () => [BracketStanding, GroupStanding] as const,
  resolveType: (value) => {
    if ('wins' in value) {
      return GroupStanding
    }
    return BracketStanding
  },
})

@Resolver((of) => BracketStanding)
export class BracketStandingResolver {
  @FieldResolver()
  team(@Root() standing: typeof Standing, @Ctx() ctx: Context) {
    return fetch(ctx)(`/teams/${standing.team.id}`)
  }
}

@Resolver((of) => GroupStanding)
export class GroupStandingResolver {
  @FieldResolver()
  team(@Root() standing: typeof Standing, @Ctx() ctx: Context) {
    return fetch(ctx)(`/teams/${standing.team.id}`)
  }
}
